import { messageModel } from "../models/message.model.js";

const getAllMessages = async () => {

    const messages = await messageModel.find();
    return messages;
}

const getMessagesById = async (id) => {
    const message = await messageModel.findById(id);
    return message;
};

const createMessage = async (data) => {

    const newMessage = new messageModel(data);
    await newMessage.save()
    return newMessage;
}

export default { getAllMessages, getMessagesById, createMessage }; 