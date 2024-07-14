import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import { userLoginValidator } from "../validators/userLogin.validator.js";
import sessionController from "../controllers/session.controller.js";


const router = Router();

router.post("/register", passport.authenticate("register"), sessionController.register);

router.post("/login", passport.authenticate("login"), sessionController.login);

// localhost:8080/api/session/jwt
router.post("/jwt", userLoginValidator, sessionController.userLoginValidator);

router.get("/current", passportCall("jwt"), authorization("user"), sessionController.currentSession);


router.get("/login", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile" ],
  session: false
}), sessionController.googleLogin);

router.get("/logout", sessionController.logout);

export default router;
