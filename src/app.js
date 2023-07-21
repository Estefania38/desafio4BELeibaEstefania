import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import {cartsRouter } from "./routes/carts.routes.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import {ProductManager} from "./dao/ProductManager.js";
import path from "path";


const app = express();
const port = 8080;

//midleware
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static('public'));

//configuracion para utilizar handlebars

app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// mis rutas
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);


//guardar el servidor http en una variable
const httpServer = app.listen(port,()=>console.log(`server listening on port ${port}`));

const socketServer = new Server(httpServer);

//crear el servidor de websocket 
const pmanagersocket=new ProductManager(__dirname + "/files/products.json");


//crear el canal de comunicacion entre front y back
socketServer.on('connection', async (socket)=>{
        console.log(`nuevo cliente conectado con ID: ${socket.id}`)
        // const listadeproductos = await pmanagersocket.getProducts({});
        socket.on("change", (obj)=>{
          socketServer.emit("enviodeproductos", obj); 
        })

      //   socket.on("addProduct", async (obj)=>{
      //       await pmanagersocket.addProduct(obj);
      //       const listadeproductos =  pmanagersocket.getProducts({}); // Obtener la lista actualizada de productos
      //       socketServer.emit('enviodeproductos', listadeproductos);
      //         });      
    
      // socket.on("deleteProduct", async (id) => {        
      //   console.log("ID del producto a eliminar:", id);
      //   const deleteProduct = await pmanagersocket.deleteProduct(id);
      //   const updateProducts = await pmanagersocket.getProducts({});
      //   socketServer.emit("productosupdated", updateProducts);
      // });  
});
