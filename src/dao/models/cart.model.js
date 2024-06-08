import mongoose from "mongoose";
const cartCollection = "cart";

// iniciamos por modificar el modelo del carrito para luego continuar con implementar la lógica de funcionamiento. Al momento de traerlos, lo hacemos mediante un populate
const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
      },
    ], 
  },
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
