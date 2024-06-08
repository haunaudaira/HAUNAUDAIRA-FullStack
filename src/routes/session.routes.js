import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userDao.create(userData);

    if (!newUser)
      return res
        .status(400)
        .json({ status: "Error", msg: "No se pudo crear el usuario" });

    res.status(201).json({ status: "Success", payload: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //verificar que el usuario sea administrador
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.user = {
        email,
        role: "admin",
      };
      return res
        .status(200)
        .json({ status: "Success", payload: req.session.user });
    }

    //si no es admin
    const user = await userDao.getByEmail(email);
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ status: "Error", msg: "Invalid email or password" });
    }

    req.session.user = {
      email,
      role: "user",
    };

    res.status(200).json({ status: "Success", payload: req.session.user }); // verificamos el usuario que esta
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ status: "Success", payload: "Logout successful." });


  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

export default router;
