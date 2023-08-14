import express from "express";
// importando ruta absoluta 
import { __dirname } from "./utils.js";
// importando mis rutas
//import { usersRouter } from "./routes/users.routes.js";
import { productsRouter} from "./routes/products.routes.js";
import {cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
//import handlebars from "express-handlebars";
import {engine} from "express-handlebars";
// importando socket.io  
import { Server } from "socket.io";
import path from "path";
import {config} from "./config/config.js";
import { connectDB } from "./config/dbConnection.js";



//inicializando el servidor
const app = express();
const port = config.server.port;


//midleware para que express entienda lo que envio por body  
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
// archivos staticos
app.use(express.static(path.join(__dirname+"/public")));
app.use(express.static('public'));

//configuracion para utilizar handlebars - motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname+"/views"));

// mis rutas
app.use("/api/cart", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);
//app.use("/api/users", usersRouter);


//guardar el servidor http en una variable
const httpServer = app.listen(port,()=>console.log(`server listening on port ${port}`));

const socketServer = new Server(httpServer);

//conectando a la base de datos
connectDB ();

// importando product manager y chat model
import { ProductsMongo } from "./dao/managers/mongo/productsMongo.js";
//crear el servidor de websocket 
const pmanagersocket=new ProductsMongo(__dirname + "/files/products.json");

import { ChatMongo } from "../src/dao/managers/mongo/chatMongo.js"
const chatMongo = new ChatMongo();


//crear el canal de comunicacion entre front y back
socketServer.on('connection', async (socket)=>{
        console.log(`nuevo cliente conectado con ID: ${socket.id}`)
        // const listadeproductos = await pmanagersocket.getProducts({});
        socket.on("change", (obj)=>{
          socketServer.emit("enviodeproductos", obj); 
        })  
});


////////////////////////////////////////////////////////////////77


//socket server
socketServer.on("connection",(socket)=>{
    console.log("nuevo cliente conectado");

    socket.on("authenticated",async(msg)=>{
      const messages = await chatModel.find();
      socket.emit("messageHistory", messages);
        socket.broadcast.emit("newUser",msg);
    }); 
    //recibir el mensaje del cliente
    socket.on("message", async(info)=>{
        console.log("data", info);
        await chatMongo.createMessage(info);
        socketServer.emit("chat", await chatMongo.getMessages());
    });
});


