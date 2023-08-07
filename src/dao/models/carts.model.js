import mongoose from "mongoose";

const cartsCollection = "cart"; // este es el nombre de la coleccion donde guardaremos los documentos

const cartsSchema = new mongoose.Schema({
    // aca definimos las propiedades y caracteristicas para el documento de un schema
    id: mongoose.Types.ObjectId, // Campo para el ID de Mongoose
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
});

export const cartsModel = mongoose.model(cartsCollection,cartsSchema);

const Cart = mongoose.model("cart", cartsSchema);

export default Cart;