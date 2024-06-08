import { productModel } from "../models/product.model.js"; //traemos la información de los productos

//llamamos a todos los productos
const getAll = async (query, options) => {
  const products = await productModel.paginate(query, options);
  
  return products;
};

const getById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

//recibe la información (data) a crear u almacenar en el producto
const create = async (data) => {
  const product = await productModel.create(data);

  return product;
};
//recibe id y data a actualizar
const update = async (id, data) => {
  await productModel.findByIdAndUpdate(id, data); //no se guarda en una variable ya que no devuelve la información actualizada, solo la busca y actualiza
  const product = await productModel.findById(id); // luego buscamos el producto con la información actualizada

  return product;
};

const deleteOne = async (id) => {
  const product = await productModel.deleteOne({ _id: id }); // con {_id: id} le estamos indicando que el id sea exactamente igual al solicitado
  if (product.deletedCount === 0) return false; // con este if evitamos que nos siga mostrando un mensaje erroneo al eliminar un producto que ya fue eliminando previamente

  return true;
};

export default { getAll, getById, create, update, deleteOne };
