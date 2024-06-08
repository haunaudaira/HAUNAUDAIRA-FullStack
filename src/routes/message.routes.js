import { Router } from "express";
import messageDao from "../dao/mongoDao/message.dao.js";

const router = Router();

// localhost:8080/api/message
router.get("/", async (req, res) =>{ 
    try {
      const message = await messageDao.getAllMessages();
  
      res.status(200).json( {status: "success", payload: message} )
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  })


//localhost:8080/api/message/
router.post("/", async (req, res) => {
    try {
        const { user, message } = req.body; //creamos el mensaje
        if (!user || !message) {return res.status(400).json({ error: 'Toda la información solicitada es requerida para continuar' })
}
        const newMessage = await messageDao.createMessage({ user, message })

        res.status(201).json({ status: "success", payload: newMessage });

    } catch (error) {

        return res.status(500).json({ error: error.message });
    }
})


// postman route: localhost:8080/api/messages/:mid
router.get("/:mid", async (req, res) => {
    try {
        const { mid } = req.params;
        const message = await messageDao.getMessagesById(mid);
        
        if (!message) return res.status(404).json({ status: "Error", msg: `el chat con el ID ${mid} no fue encontrado.` }) //si ese id no existe devolver un 404 

        res.status(200).json({ status: "success", payload: message })
    } catch (error) {
        console.error(error);
       
        res.status(500).json({ error: error.message });
    }

})

export default router