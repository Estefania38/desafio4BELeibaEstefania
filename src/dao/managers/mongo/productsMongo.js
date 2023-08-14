import { productsModel } from "../../models/products.model.js";


export class ProductsMongo {

    constructor() {
        this.model = productsModel;
    };

    //get 

    async get() {
        try {
            const products = await this.model.find().lean();
            return products;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al obtener los productos");
        }
    };

    // getProducts

    async getProducts() {
        try {
            const products = await this.model.find().lean();
            return products;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al obtener los productos");
        }
    };

    //getProductById    

    async getProductById(id) {
        try {
            const product = await this.model.findById(id);
            return product;
        } catch (error) {
            console.log(error.message);
            throw new Error("Producto no encontrado");
        }
    };

    //save product

    async save(newProduct) {
        try {
            const productCreated = await this.model.create(newProduct)
            return productCreated;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al crear el producto");
        }
    };

    // updateProduct

    async updateProduct(id, updatedFields) {
       /* if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID de producto no válido");
          }*/
        try {
            const product = await this.model.findByIdAndUpdate(id, updatedFields, {
                new: true, // Devolverá el documento modificado después de la actualización
            });

            if (product) {
                console.log("Producto actualizado con éxito. El producto actualizado es:", product);
                return product;
            } else {
                throw new Error("Producto no encontrado");
            }
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al actualizar el producto");
        }
    };

    // deleteProduct    

    async deleteProduct(id) {
        try {
            const deletedProduct = await this.model.findByIdAndRemove(instanceofd);

            if (deletedProduct) {
                console.log("Producto eliminado con éxito. El producto eliminado es:", deletedProduct);
                return true;
            } else {
                throw new Error("Producto no encontrado");
            }
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al eliminar el producto");
        }
    };

    //addProduct

    async addProduct(newProduct) {
        try {
            const { title, description, price, thumbnail, code, stock, category } = newProduct;

            if (!title.trim() || !description.trim() || !price || !thumbnail.trim() || !code || !stock || !category.trim()) {
                console.error("Error: todos los campos son obligatorios");
                return;
            }

            if (typeof price !== 'number' || price <= 0 || !Number.isInteger(price)) {
                console.error("Error: el precio debe ser un número positivo");
                return;
            }

            if (typeof stock !== 'number' || stock <= 0 || !Number.isInteger(stock)) {
                console.error("Error: el stock debe ser un número entero positivo");
                return;
            }

            const productData = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                category,
            };

            const newProductDoc = await this.model.create(productData);
            console.log("Producto agregado con éxito. El nuevo producto es:", newProductDoc);
            return newProductDoc;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al agregar el producto");
        }
    }
}







