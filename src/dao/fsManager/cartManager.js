import fs from "fs";

let carts = [];
const pathFile= "./src/data/carts.json"

const getCarts = async () => {
    try {
        const cartsJson = await fs.promises.readFile(pathFile, 'utf8');
        carts = JSON.parse(cartsJson) || [];
        return carts;
    } catch (error) {
        throw error;
    }
}

const createCart = async () =>{
    await getCarts();

    const newCart = {
        id: carts.length + 1,
        products: [],
    }
    carts.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
    return newCart;
}

const getCartById = async (cid) =>{
    await getCarts();
    const cart = carts.find(c => c.id === cid) // busque el id del carrito que sea igual al id de carrito que recibimos
    // manejo de error: "si el carrito no existe o no se encuentra"
    if (!cart) return `No se encuentra el carrito con el ID ${cid}`
    return cart.products // retornamos el array de productos del carrito
}


const addProductsToCart = async (cid, pid) =>{
    await getCarts();

    const index = carts.findIndex(c => c.id === cid); // modificamos el carrito con un id especifico

    if (index === -1)return `No se encontró el carrito con el ID ${cid}`

    const product = carts [index].products.find(p => p.product ==pid);
    if (product){
        product.quantity += 1; // += para incrementar la cantidad
    } else{  // si no existe, añadimos otro producto
        carts[index].products.push({
            product: pid,
            quantity: 1
        });
    }
    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
    return carts[index];
}

export default {getCarts, createCart, getCartById, addProductsToCart}