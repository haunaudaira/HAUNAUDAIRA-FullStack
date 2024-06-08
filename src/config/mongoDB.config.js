import mongoose from "mongoose";
const urlDb = `mongodb+srv://admin:coderdbtest@e-commerce.xeozaf3.mongodb.net/ecommerce`;

export const connectMongoDB = async () =>{
    try {
        //configuración de conexión con la BD
        mongoose.connect(urlDb)
        console.log("¡Mongo DB conectado exitosamente!");
    } catch (error) {
        console.log(error);
    }
}