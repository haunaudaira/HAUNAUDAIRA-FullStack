import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

// acá, a parte de crear las rutas, hacemos el manejo de errores

//localhost:8080/api/carts/
router.post("/", passportCall("jwt"), authorization("user"), cartsController.createCart)

//postman route: localhost:8080/api/carts/:cid/products/:pid
router.post("/:cid/products/:pid", passportCall("jwt"), authorization("user"), cartsController.addProductsToCart)

//postman route: localhost:8080/api/carts/:cid/products/:pid
router.put("/:cid/products/:pid", passportCall("jwt"), authorization("admin"), cartsController.updateQuantityProductsInCart)


router.delete("/:cid/products/:pid", passportCall("jwt"), authorization("admin"), cartsController.deleteProductFromCart)

// pos man route: localhost:8080/api/carts/:cid
router.get("/:cid", passportCall("jwt"), authorization("admin"), cartsController.getById)


router.put ("/:cid", passportCall("jwt"), authorization("admin"), cartsController.updateCart)


router.delete("/:cid", passportCall("jwt"), authorization("admin"), cartsController.deleteAllProductsFromCart)

export default router