import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

// acá, a parte de crear las rutas, hacemos el manejo de errores

//localhost:8080/api/carts/
router.post("/", authorization("user") ,async (req, res) => {
    try {
        const cart = await cartDao.create(); //creamos el carrito

        res.status(201).json({ status: "success", payload: cart });

    } catch (error) {
        console.error(error);

        res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
    }
})

//postman route: localhost:8080/api/carts/:cid/products/:pid
router.post("/:cid/products/:pid", passportCall("jwt"), authorization("user") ,async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cartDao.addProductsToCart(cid, pid) //cart id, product id

        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `el producto con el ID ${pid} no fue encontrado.` })
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `el carrito con el ID ${cid} no fue encontrado.` })

        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        console.error(error);

        res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
    }
})

//postman route: localhost:8080/api/carts/:cid/products/:pid
router.put("/:cid/products/:pid", passportCall("jwt"), authorization("admin"), async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body;
        const cart = await cartDao.updateQuantityProductsInCart(cid, pid, quantity) //cart id, product id

        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `el producto con el ID ${pid} no fue encontrado.` })
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `el carrito con el ID ${cid} no fue encontrado.` })

        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        console.error(error);

        res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
    }
})


router.delete("/:cid/products/:pid", passportCall("jwt"), authorization("admin"),async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cartDao.deleteProductFromCart(cid, pid) //cart id, product id

        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `el producto con el ID ${pid} no fue encontrado.` })
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `el carrito con el ID ${cid} no fue encontrado.` })

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.error(error);

        res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
    }
})

// pos man route: localhost:8080/api/carts/:cid
router.get("/:cid", passportCall("jwt"), authorization("admin"), async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);
        
        if (!cart) return res.status(404).json({ status: "Error", msg: `el carrito con el ID ${cid} no fue encontrado.` }) //si ese id no existe devolver un 404 

        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        console.error(error);
       
        res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
    }

})


router.put ("/:cid", passportCall("jwt"), authorization("admin"), async (req, res) =>{
    try {
        const { cid } = req.params;
        const body = req.body;
        const cart = await cartDao.update(cid, body);
        
        if (!cart) return res.status(404).json({ status: "Error", msg: `el carrito con el ID ${cid} no fue encontrado.` }) //si ese id no existe devolver un 404 

        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        console.error(error);
       
        res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
    }
})


router.delete("/:cid", passportCall("jwt"), authorization("admin"), async (req, res) =>{
    try {
        const { cid } = req.params;
        const cart = await cartDao.deleteAllProductsFromCart(cid);
        
        if (!cart) return res.status(404).json({ status: "Error", msg: `el carrito con el ID ${cid} no fue encontrado.` }) //si ese id no existe devolver un 404 

        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        console.error(error);
       
        res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
    }
})

export default router