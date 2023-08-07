import { Router } from "express";
import {ProductsMongo} from "../dao/managers/mongo/productsMongo.js"
import { io } from "socket.io-client";
import { __dirname } from "../utils.js";

const router = Router();
const productService = new ProductsMongo();

// Ruta raíz GET /
router.get("/", async (req, res) => {

  try {
    const limit = parseInt(req.query.limit);
    const products = await productService.get();
    if (!isNaN(limit) && limit > 0) {
      const limitedProducts = products.slice(0, limit);
      return res.json({ status: "success", data: limitedProducts });
    } else {
      return res.json({ status: "success", data: products });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Ruta GET /:pid
router.get("/:pid", async (req, res) => {

  try {
    const id = parseInt(req.params.pid);
    const product = await productService.getProductById(id);
    if (product) {
      return res.json({ status: "success", data: product });
    } else {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Ruta POST /
router.post("/", async (req, res) => {
  const socket = io('http://localhost:8080');
  try {
    const newProduct = req.body;
    productService.addProduct(newProduct);
    socket.emit("change", productService.getProducts());
    return res.json({ status: "success", message: "Producto creado" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Ruta PUT /:pid
router.put("/:pid", async (req, res) => {
  const socket = io('http://localhost:8080');
  try {
    const id = parseInt(req.params.pid);
    const updatedFields = req.body;
    const success = productService.updateProduct(id, updatedFields);
    if (success) {
      socket.emit("change", productService.getProducts());
      return res.json({ status: "success", message: "Producto actualizado" });
    } else {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Ruta DELETE /:pid
router.delete("/:pid", async (req, res) => {
  const socket = io('http://localhost:8080');
  try {
    const id = parseInt(req.params.pid);
    const success = productService.deleteProduct(id);
    if (success) {
      console.log('hola eliminado');
      socket.emit('change', productService.getProducts())
      return res.status(200).json({ status: "success", message: "Producto eliminado" });
    } else {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export { router as productsRouter };
