import mongoose from "mongoose";
const userCollection = "user";

// iniciamos por modificar el modelo del carrito para luego continuar con implementar la lógica de funcionamiento. Al momento de traerlos, lo hacemos mediante un populate
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  age: Number
});

export const userModel = mongoose.model(userCollection, userSchema);
