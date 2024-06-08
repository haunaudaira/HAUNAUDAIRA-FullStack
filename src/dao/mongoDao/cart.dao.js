import { cartModel } from "../models/cart.model.js"; //traemos la información de los productos
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

//recibe la información (data) a crear u almacenar en el producto
const create = async (data) => {
  const cart = await cartModel.create(data);

  return cart;
};

const addProductsToCart = async (cid, pid) => {
  //chequeamos si existe el producto
  const product = await productModel.findById(pid);
  // si no se encontró el producto:
  if (!product)
    return {
      product: false, // con este objeto identificamos de donde viene el error
    };
  // repetimos para el carrito
  const cart = await cartModel.findById(cid);
  if (!cart)
    return {
      cart: false,
    };

  // Si el producto ya existe en el carrito, incrementamos en 1 su cantidad
  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } }
  ); //realizamos el update

  // si el producto no se encuentra en el carrito, lo agrega
  if (!productInCart) {
    await cartModel.findByIdAndUpdate(cid, {
      $push: { products: { product: pid, quantity: 1 } },
    });
  }
  //como la actualización productincart no retorna el carrito actualizado, volvemos a consultarlo
  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate;
};

const deleteProductFromCart = async (cid, pid) => {
  // primero buscamos el producto
  const product = await productModel.findById(pid);
  // si no se encontró el producto:
  if (!product)
    return {
      product: false, // con este objeto identificamos de donde viene el error
    };

  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": -1 } }
  ); //el filtro de búsqueda inicia por el id del carrito y dentro de este buscara el pid a eliminar. A continuación, se indica que decremente la cantidad de productos.

  /* siendo "$inc" operador utilizado para incrementar el valor de un campo numérico en la cantidad especificada. 
  "products.$.quantity":
    product: indica el nombre del array
    $: es el operador de posición. Representa el primer elemento del array que coincide con la condición especificada en el filtro de la consulta. Selecciona el elemento correcto del array para la actualización
    quantity: es el campo del objeto dentro del array products cuyo valor queremos incrementar.  
  */
  if (!cart)
    return {
      cart: false,
    };

  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate;
};

// este endpoint por indicación del profesor no nos detuvimos a corregir el problema con mongo que no nos permite continuar
const update = async (cid, data) => {
  await cartModel.updateOne({ _id: cid }, { $set: { products: data } });

  const cart = await cartModel.findById(cid);
  return cart;
};

const updateQuantityProductsInCart = async (cid, pid, quantity) => {
  const product = await productModel.findById(pid);
  if (!product)
    return {
      product: false,
    };

  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } } // actualizamos la cantidad recibida en el body
  );
  if (!cart)
    return {
      cart: false,
    };

    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};

const deleteAllProductsFromCart = async ( cid ) => {
  const cart = await cartModel.findByIdAndUpdate(cid, {
    $set: { products: [] } // seteamos el carrito en 0
  });
  
  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate;
  
};

export default {
  getById,
  create,
  addProductsToCart,
  deleteProductFromCart,
  update,
  updateQuantityProductsInCart,
  deleteAllProductsFromCart
};
