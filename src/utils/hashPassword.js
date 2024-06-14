import bcrypt from 'bcrypt';

//función que hashea la contraseña

export const createHash = ( password ) => {
    return bcrypt.hashSync( password, bcrypt.genSaltSync(10) ) //standard de encriptado
};

//función que valida la contraseña
export const isValidPassword = ( user, password ) => {
    return bcrypt.compareSync( password, user.password )
}



