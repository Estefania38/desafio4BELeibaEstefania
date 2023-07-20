import { Router } from "express";
import { ProductManager } from "../dao/ProductManager.js";
import { __dirname } from "../utils.js";

const pmanager= new ProductManager(__dirname, "/files/products.json ");
const router = Router();

        //routes
        //ruta a home
        router.get("/", async(req,res)=>{
            const listaproductos=await pmanager.getProducts({})
            console.log(listaproductos)
            res.render("home", {listaproductos}, {style:"home.css"});
        });

   
        //ruta a productos en tiempo real
        router.get('/realtimeproducts', (req,res)=>{
            res.render("realTimeProducts");
        });   

export {router as viewsRouter};









