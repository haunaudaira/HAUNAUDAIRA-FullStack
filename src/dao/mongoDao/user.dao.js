import { userModel } from "../models/user.model.js"; //traemos la información de los useros

//llamamos a todos los useros
const getAll = async () => {
  const users = await userModel.find();

  return users;
};

const getById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};
const getByEmail = async (email) => {
  const user = await userModel.findOne({email});
  return user;
};

//recibe la información (data) a crear u almacenar en el usero
const create = async (data) => {
  const user = await userModel.create(data);

  return user;
};
//recibe id y data a actualizar
const update = async (id, data) => {
  await userModel.findByIdAndUpdate(id, data); //no se guarda en una variable ya que no devuelve la información actualizada, solo la busca y actualiza
  const user = await userModel.findById(id); // luego buscamos el usero con la información actualizada

  return user;
};

const deleteOne = async (id) => {
  const user = await userModel.deleteOne({ _id: id }); // con {_id: id} le estamos indicando que el id sea exactamente igual al solicitado
  if (user.deletedCount === 0) return false; // con este if evitamos que nos siga mostrando un mensaje erroneo al eliminar un usero que ya fue eliminando previamente

  return true;
};

export default { getAll, getById, getByEmail, create, update, deleteOne };
