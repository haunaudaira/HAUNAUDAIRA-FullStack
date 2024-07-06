import { userModel } from "./user.model.js";


//utilizamos "query" de forma genérica para que podamos solicitar un usuario con cualquier dato que queramos: nombre, email, edad, etc.
const getAll = async (query) =>{
    return await userModel.find(query);
};

const getOne = async (query) =>{
    return await userModel.findOne(query);
};

const create = async (data) =>{
    return await userModel.create(data);
};

const update = async (id, data) =>{
    return await userModel.findByIdAndUpdate(id, data, {new: true} ); // el ultimo parametro nos devuelve el valor actualizado de lo que acabamos de hacer
};

const deleteOne = async (id) =>{
    return await userModel.deleteOne({_id: id});
};

export default {getAll, getOne, create, update, deleteOne}
