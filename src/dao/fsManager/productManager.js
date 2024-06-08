import fs from 'fs';

let products = [];
let pathFile = "./src/data/products.json";

const addProduct= async (product) =>{
    const { title, description, price, thumbnail, code, stock } = product
    await getProducts();
    const newProduct ={
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true
    }
    
    if (Object.values(newProduct).includes(undefined)){
        console.log(`Todos los campos son obligatorios`);
        return;
    }

    const productExist= products.find( product => product.code === code) 
    if (productExist){
        console.log(`El ${title} con el código ${code} ya existe`);
        return; 
    }

    products.push(newProduct); 
    
    // guardo el array en el archivo json creado como strings
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

// modificamos getproducts para que reciba el límite en la búsqueda de productos. lo buscamos products?= + el numero que queremos filtrar
const getProducts= async (limit) => { 
    const productJson = await fs.promises.readFile(pathFile, "utf8");
    products = JSON.parse(productJson) || [];

    if(!limit) return products; //si no recibe limite, mostramos todos los productos

    return products.slice(0,limit); //si recibe limite, se hace un slice que recorta la cantidad desde la posicion cero hasta la posicion limite que recibimos por parámetro
}


const getProductById= async (id) =>{
    await getProducts();
    const product = products.find( product => product.id === id)
    if (!product){
        console.log(`El producto con el id ${id} no fue encontrado`);
        return;
    } else {
        console.log(product);
        return product;
    }
}

// esta función permite sobreescribir los productos ya cargados pero sin modificar el ID:
const updateProduct = async (id, dataProducts) =>{
    await getProducts(); 
    const index = products.findIndex(product => product.id === id);
    products[index] = {
        ...products[index],
        ...dataProducts
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

// esta función permite ELIMINAR productos cargados:
const deleteProduct = async (id) =>{
    await getProducts();
    products = products.filter( product => product.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}





export default {addProduct, getProductById, getProducts, updateProduct, deleteProduct}

