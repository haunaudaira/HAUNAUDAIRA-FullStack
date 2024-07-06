import jwt from 'jsonwebtoken';

//creamos token

export const createToken = (user) =>{
    const { _id, email, role } = user;
    const token = jwt.sign( {_id, email, role }, "codigoSecreto", {expiresIn: "3m"} );
    return token;
}

//verificamos token

export const verifyToken = (token) =>{
    try {
    const decode = jwt.verify( token, "codigoSecreto" )
    return decode; //retorna id y email codificados en el paso anterior
    } catch (error) {
        return null;
    }
}