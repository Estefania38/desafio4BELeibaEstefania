import { chatModel } from "../../models/chat.model.js";

export class ChatMongo {
    getMessages = async () => {
      try {
        return await chatModel.find().lean().exec();
      } catch (error) {
        return error;
      }
    }
  
    createMessage = async (message) => {
      try {
        return await chatModel.create(message);
      } catch (error) {
        return error;
      }
    }
  }