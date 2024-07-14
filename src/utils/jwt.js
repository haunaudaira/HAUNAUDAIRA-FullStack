import jwt from 'jsonwebtoken';
import envs from "../config/env.config.js"

//creamos token

export const createToken = (user) =>{
    const { _id, email, role } = user;
    const token = jwt.sign( {_id, email, role }, envs.CODE_SECRET, {expiresIn: "3m"} );
    return token;
}

//verificamos token

export const verifyToken = (token) =>{
    try {
    const decode = jwt.verify( token, envs.CODE_SECRET )
    return decode; //retorna id y email codificados en el paso anterior
    } catch (error) {
        return null;
    }
}