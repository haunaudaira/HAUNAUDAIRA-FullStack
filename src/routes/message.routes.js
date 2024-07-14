import { Router } from "express";
import messageDao from "../dao/mongoDao/message.dao.js";
import messagesController from "../controllers/messages.controller.js";


const router = Router();

//localhost:8080/api/message/
router.post("/",messagesController.createMessage )

// localhost:8080/api/message
router.get("/", messagesController.getAllMessages )

// postman route: localhost:8080/api/messages/:mid
router.get("/:mid", messagesController.getMessagesById)

export default router