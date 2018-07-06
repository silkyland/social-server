import express from "express";
import Message from "../schema/Message";
const router = express.Router();

router.get("/", async (req, res, next) => {
  let messages = await Message.find({});
  return res.json(messages);
});

router.post("/create", async (req, res, next) => {
  const { message } = req.body;
  const user = req.user;
  let messageTable = new Message();
  messageTable.message = message;
  messageTable.userId = user._id;
  try {
    await messageTable.save();
    res.json(messageTable);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/update", async (req, res) => {
  const { message, _id } = req.body;
  try {
    let updateMessage = await Message.update(
      { _id: _id },
      { $set: { message: message } }
    );
    res.json(updateMessage);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
