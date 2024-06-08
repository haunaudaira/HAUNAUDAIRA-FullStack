import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: Array,
        default: []
    },
    category: {
        type: String,
        require: true
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

productSchema.plugin(mongoosePaginate); // plugin de mongoose requerido para la paginación

export const productModel = mongoose.model(productCollection, productSchema)