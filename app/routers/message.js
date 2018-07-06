import express from "express";
import Message from "../schema/Message";
const router = express.Router();

router.get("/", async (req, res, next) => {
  let messages = await Message.find({});
  return res.json(messages);
});

router.post("/create", async (req, res, next) => {
  const { message } = req.body.Message;
  let messageTable = new Message();
  messageTable.message = message;
  try {
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
