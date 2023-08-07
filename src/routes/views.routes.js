import { Router } from "express";
import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js"
import { __dirname } from "../utils.js";

const pmanagersocket= new ProductsMongo(__dirname, "/files/products.json ");
const router = Router();

        //routes
        //ruta a home
        router.get("/", async(req,res)=>{
            try{
            const listaproductos = await pmanagersocket.getProducts()
            console.log(listaproductos)
            res.render("home", {listaproductos}, {style:"home.css"});
            }catch(error){
                console.error("Error en la ruta/:",error);
                res.status(500).send("Error interno del servidor");
            }
        });
   
        //ruta a productos en tiempo real
        router.get('/realtimeproducts', async (req,res)=>{
            try{
            const listaproductos = await pmanagersocket.getProducts({})
            console.log(listaproductos);
            res.render("realTimeProducts",{listaproductos:listaproductos});
        }catch(error){
            console.error("Error en la ruta /realTimeProducts:", error);
            res.status(500).send("Error interno del servidor");
        }
        });   

      
export {router as viewsRouter};









