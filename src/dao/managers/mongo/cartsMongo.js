import { cartsModel} from "../../models/carts.model.js";
import mongoose from "mongoose";

export class CartsMongo {

    constructor (){
        this.model = cartsModel;
    };
    
      async getAll() {
        try {
          const carts = await Cart.find();
          return carts;
        } catch (error) {
          throw error;
        }
      }
    
      async save() {
        try {
          const newCart = new Cart({ products: [] });
          await newCart.save();
          return newCart;
        } catch (error) {
          throw error;
        }
      }
    
      async addCart(cartId, productId) {
        try {
          const cart = await Cart.findById(cartId);
          if (cart) {
            const existingProduct = cart.products.find((p) => p.product.equals(productId));
    
            if (existingProduct) {
              existingProduct.quantity++;
            } else {
              cart.products.push({ product: productId, quantity: 1 });
            }
    
            await cart.save();
          } else {
            throw new Error("Carrito no encontrado");
          }
        } catch (error) {
          throw error;
        }
      }
    
      async getCartById(id) {
        try {
          const cart = await Cart.findById(id);
          return cart;
        } catch (error) {
          throw error;
        }
      }
    }
    