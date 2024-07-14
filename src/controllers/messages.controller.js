//albergamos en este archivo todos los controladores que hasta el momento se encontraban en routes

import messageDao from "../dao/mongoDao/message.dao.js";

const createMessage = async (req, res) => {
    try {
        const { user, message } = req.body; //creamos el mensaje
        if (!user || !message) {return res.status(400).json({ error: 'Toda la información solicitada es requerida para continuar' })
}
        const newMessage = await messageDao.createMessage({ user, message })

        res.status(201).json({ status: "success", payload: newMessage });

    } catch (error) {

        return res.status(500).json({ error: error.message });
    }
}

const getAllMessages = async (req, res) =>{ 
    try {
      const message = await messageDao.getAllMessages();
  
      res.status(200).json( {status: "success", payload: message} )
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

const getMessagesById = async (req, res) => {
    try {
        const { mid } = req.params;
        const message = await messageDao.getMessagesById(mid);
        
        if (!message) return res.status(404).json({ status: "Error", msg: `el chat con el ID ${mid} no fue encontrado.` }) //si ese id no existe devolver un 404 

        res.status(200).json({ status: "success", payload: message })
    } catch (error) {
        console.error(error);
       
        res.status(500).json({ error: error.message });
    }

}

export default {createMessage, getAllMessages, getMessagesById}