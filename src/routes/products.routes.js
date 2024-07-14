import { Router } from "express";
const router = Router();
import productDao from "../dao/mongoDao/product.dao.js";
import { isLogged } from "../middlewares/isLogin.middleware.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import productsController from "../controllers/products.controller.js";

// res: respuesta que enviamos al cliente || request: información que nuestro servidor recibe del cliente
//con esta función traemos los productos. url: localhost:8080/api/products
router.get("/", productsController.getAllProducts);

//desde esta función vamos a poder filtrar por un id especifico de algún producto. url: localhost:8080/api/products/:pid
router.get("/:pid", productsController.getProductsByID);

router.post("/", passportCall("jwt"), authorization("admin"), productsController.createProduct)

router.put("/:pid", productsController.updateProduct);

router.delete("/:pid", productsController.deleteOneProduct);

export default router;
