import mongoose from "mongoose";

const chatCollection = "chat-message";

const messageSchema = new mongoose.Schema({

    user:{
        type:String,
        required: true
    },
    message:{
        type:String,
        required: true
    }
});

export const chatModel = mongoose.model(chatCollection, messageSchema)



