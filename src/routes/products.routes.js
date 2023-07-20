import { Router } from "express";
import { ProductManager } from "../dao/ProductManager.js";
import { io } from "socket.io-client";
import { __dirname } from "../utils.js";

const router = Router();
const productService = new ProductManager('products.json');

// Ruta raíz GET /
router.get("/", async (req, res) => {
  const socket = io('http://localhost:8080');
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
  const socket = io('http://localhost:8080');
  try {
    const productId = parseInt(req.params.pid);
    const product = await productService.getProductById(productId);
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
    return res.json({ status: "success", message: "Producto creado" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Ruta PUT /:pid
router.put("/:pid", async (req, res) => {
  const socket = io('http://localhost:8080');
  try {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    const success = await productService.updateProduct(productId, updatedFields);
    if (success) {
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
    const productId = parseInt(req.params.pid);
    const success = await productService.deleteProduct(productId);
    if (success) {
      return res.json({ status: "success", message: "Producto eliminado" });
    } else {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export { router as productsRouter };
