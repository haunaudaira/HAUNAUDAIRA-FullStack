import { Router } from "express";
const router = Router();
import productDao from "../dao/mongoDao/product.dao.js";
import { isLogged } from "../middlewares/isLogin.middleware.js";

// res: respuesta que enviamos al cliente || request: información que nuestro servidor recibe del cliente
//con esta función traemos los productos. url: localhost:8080/api/products
router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, category, status } = req.query; //pasamos el límite que estamos recibiendo por query
    //creamos nuevo objeto que contenga las distintas opciones sobre la información solicitada para la búsqueda
    const options = {
      limit: limit || 10, // si no se indica límites, traerá 10
      page: page || 1, // por defecto inicia en la primer página
      // utilizamos el método sort para ordenar los elementos
      sort: {
        price: ( sort === "asc" ? 1 : -1), //op ternario para indicar si la información se muestra en ascendente o descendente. x defecto siempre viene en orden descendente
      },
      lean: true,
    };
    if (status) {
      const products = await productDao.getAll({ status: status }, options);
      return res.status(200).json({ products });
    }

    if (category) {
      const products = await productDao.getAll({ category: category }, options);
      return res.status(200).json({ products });
    }

    const products = await productDao.getAll({}, options);

    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
    console.log(error);
  }
});

//desde esta función vamos a poder filtrar por un id especifico de algún producto. url: localhost:8080/api/products/:pid
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; //id como string

    const product = await productDao.getById(pid); //transforma en número al dato recibido, utilizado en nest. tambien puede ser Number(pid) o parseInt(pid)
    if (!product)
      return res.status(404).json({
        status: "Error",
        msg: `Producto con el id ${pid} no encontrado`,
      }); //manejo de error

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ error: "Error con el ID ingresado" }); // Agregar respuesta de error
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productDao.create(product);

    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    // si no se ingresa alguno de los campos, se devuelve un status 400 de petición mala con el mensaje informativo
    return res.status(400).json({ status: "Error", msg: "Todos los campos son obligatorios" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const productData = req.body; // tanto en put como en delete, tuve que parsear a product id para que mi json lograra actualizarse.

    const updateProduct = await productDao.update(pid, productData);
    if (!product)
      return res.status(404).json({
        status: "Error",
        msg: `Producto con el id ${pid} no encontrado`,
      });

    res.status(201).json({ status: "success", payload: updateProduct });
  } catch (error) {
    res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.deleteOne(pid);

    if (!product)
      return res.status(404).json({
        status: "Error",
        msg: `Producto con el id ${pid} no encontrado`,
      }); //si product devuelve false, retornar un 404

    res.status(201).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ status:"Error", msg: "Error interno del servidor" });
  }
});

export default router;
