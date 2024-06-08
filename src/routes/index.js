import { Router } from "express";
import productsRouters from "./products.routes.js"
import cartsRouters from "./carts.routes.js"
import messageRouters from "./message.routes.js"
import sessionRouters from "./session.routes.js"
import { isLogged } from "../middlewares/isLogin.middleware.js";
const router = Router ();

//endpoints a trabajar
router.use("/products", isLogged, productsRouters);
router.use("/carts", cartsRouters);
router.use("/message", messageRouters);
router.use("/session", sessionRouters);






export default router