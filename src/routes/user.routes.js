import { Router } from "express";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { checkLogin } from "../middlewares/checkLogin.middleware.js";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/register", passport.authenticate("register"), userController.register );

router.post("/login", passport.authenticate("login", { session: false }), userController.login );

export default router;