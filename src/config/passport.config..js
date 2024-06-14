import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";
import { isValidObjectId } from "mongoose";
import google from "passport-google-oauth20";


const localStrategy = local.Strategy;

const googleStrategy = google.Strategy;

const initializePassport = () => {
  //funcion que inicializa estrategias que configuremos
  //passport solo toma dos datos del usuario que son: username y password.
  // la prop  passreqtocallback permite obtener la request del usuario. En la prop usernameField especificamos a que propiedad recibida por request  utilizaremos como username de passport
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age } = req.body;
          const user = await userDao.getByEmail(username); 
          // si el usuario existe
          if(user) return done(null, false, { message: "User already exists"})

            //sino 
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password), // cuando creemos el usuario, se guardará la contraseña hasheada
          };

          const createUser = await userDao.create(newUser);
          return done(null, createUser)
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

passport.use(
    "login",
    new localStrategy({usernameField: "email"}, async (username, password, done) => {
        try {
            const user = await userDao.getByEmail(username);
            if ( !user || !isValidPassword ( user, password)) return done (null, false, { message:"Wrong email or password" });

            // si los datos están bien
            return done(null, user);
        } catch (error) {
            done(error)
        }
    }),

)

passport.use(
    "google",
    new googleStrategy(
        {
            clientID: "",
            clientSecret: "",
            callbackURL: "",
        }, 
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const { name, emails } = profile;
                const user = {
                    first_name: name.givenName,
                    last_name: name.familyName,
                    email: emails[0].value,
                    //profile_picture: photos.[0].value añadir en la constante desestructurada: "photos" y a la estructura de usuario en user.model
                };
                const existUser = await userDao.getByEmail(emails[0].value)
                if(existUser) return cb(null, existUser);

                const newUser = await userDao.create(user);
            } catch (error) {
                return cb(error) 
            }
        }
    )
)

//done es una función que nos sirve para informa a passport si esta todo bien, la debemos llamar cuando terminamos de procesar la autenticación
passport.serializeUser( (user,done) =>{
    done (null, user._id)
});

passport.deserializeUser( async (id, done) => {
    const user = await userDao.getById(id);
    done(null, user)
}) 

 


export default initializePassport;
