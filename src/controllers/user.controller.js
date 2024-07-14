//albergamos en este archivo todos los controladores que hasta el momento se encontraban en routes

import userDao from "../dao/mongoDao/user.dao.js";

const register = async (req, res) => {
    try {
      res.status(201).json({ status: "ok", user: req.user });
    } catch (error) {
      console.log(`Erro: ${error.message}`);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
  }

  const login = async (req, res) => {
    try {
      const token = createToken(req.user)
      
      res.cookie("token", token, { httpOnly: true});
  
      res.status(200).json({ status: "ok", user: req.user });
    } catch (error) {
      console.log(`Erro: ${error.message}`);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
  }



export default { register, login }