import mongoose from "mongoose";
const userCollection = "user";

// iniciamos por modificar el modelo del carrito para luego continuar con implementar la lógica de funcionamiento. Al momento de traerlos, lo hacemos mediante un populate
//userSchema: define el esquema del usuario con los campos que
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart" //referencia al modelo de carts
  },
  role: {
    type: String,
    default: 'user'
  },
});

export const userModel = mongoose.model(userCollection, userSchema);
