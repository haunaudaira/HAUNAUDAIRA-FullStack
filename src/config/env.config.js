import dotenv from "dotenv";

const environment = "PRODUCTION"
// ejecutamos este paquete para que se puedan leer las variables de entorno
dotenv.config({
    path: environment === "PRODUCTION" ? "./.env.prod" : "./.env.dev" // si environment es estrictamente igual a production ira a una dirección, sino, a otra
}); 

//podemos crear un objeto de configuración que nos permitirá utilizar en la app la config de las variables de entorno.
 
export default {
    PORT: process.env.PORT, 
    MONGO_URL: process.env.MONGO_URL,
    CODE_SECRET: process.env.CODE_SECRET, // se cambio en jwt.js, passport.config.js (secretOrKey) 
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID, // se cambió en passport.config.js
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET, // se cambió en passport.config.js
    // CALLBACK_URL: process.env.CALLBACK_URL, // se cambió en passport.config.js
    
}