import express from "express";
import router from "./routes/index.js";
import session from "express-session"
import MongoStore from "connect-mongo";
import { connectMongoDB } from "./config/mongoDB.config.js";
import passport from "passport";
import initializePassport from "./config/passport.config..js";

//conexión a BD 
connectMongoDB();

const app = express();
//middleware lee archivos j son
app.use(express.json());
//MongoStore se encarga de eliminar la sesión de los usuario una vez que finalice.
app.use(session({
  store: MongoStore.create({
    mongoUrl:"mongodb+srv://admin:coderdbtest@e-commerce.xeozaf3.mongodb.net/ecommerce",
    ttl: 15,
  }),
  secret: "CodigoSecreto",
  resave: true,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
initializePassport();

app.use(express.urlencoded({ extended: true })); // nos permite leer postman
app.use("/api", router); //agregado para la primer pre-entrega






app.listen(8080, () => {
  console.log("Escuchando al servidor en el puerto 8080")
})