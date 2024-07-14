import mongoose from "mongoose";
import envs from "./env.config.js"


export const connectMongoDB = async () =>{
    try {
        //configuración de conexión con la BD
        mongoose.connect(envs.MONGO_URL)
        console.log("¡Mongo DB conectado exitosamente!");
    } catch (error) {
        console.log(error);
    }
}