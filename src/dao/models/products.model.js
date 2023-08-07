import mongoose from "mongoose";

const productsCollection = "products"; // este es el nombre de la coleccion donde guardaremos los documentos

const productSchema = new mongoose.Schema({
    // aca definimos las propiedades y caracteristicas para el documento de un schema
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["Indumentaria","Calzado","Accesorios"]
    },
    stock:{
        type:Number,
        required:true
    }
});

export const productsModel = mongoose.model(productsCollection,productSchema);

const Product = mongoose.model("Products", productSchema);

export default Product;
