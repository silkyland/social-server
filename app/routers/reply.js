import express from "express";
import Message from "../schema/Message";
import Reply from "../schema/Reply";
const router = express.Router();

router.post("/findReplyByMessageId", async (req, res) => {
  const { messageId } = req.body;
  let replies = await Reply.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true
      }
    }
  ]);
  return res.json(replies);
});
router.post("/addReply", async (req, res) => {
  const { messageId, message } = req.body;
  if (!message) {
    res.status(422).json({
      message: "โปรดตรวจสอบการใส่ข้อมูลของคุณ"
    });
  }
  try {
    let reply = new Reply();
    reply.messageId = messageId;
    reply.userId = req.user._id;
    reply.message = message;
    await reply.save();
    let replyMessages = await Reply.find({ messageId: messageId });
    res.json({
      alert: {
        title: "Success !",
        message: "Reply Message was added succesfully !"
      },
      replies: replyMessages
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/updateReply", async (req, res) => {
  const { messageId, replyId, replyMessage } = req.body;
  if (!replyId || !replyMessage) {
    res.status(422).json({ message: "โปรดตรวจสอบการใส่ข้อมูลของคุณ" });
  }
  try {
    let updateMessage = await Reply.update(
      { _id: replyId },
      { $set: { message: replyMessage } }
    );
    let replyMessages = await Reply.find({ messageId: messageId });
    res.json({
      alert: {
        title: "Success !",
        message: "Reply Message was added to message succesfully !"
      },
      replies: replyMessages
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/removeReply", async (req, res) => {
  const { replyId } = req.body;
  try {
    let updatedMessage = await Reply.findOneAndRemove({ _id: replyId });
    res.json({
      alert: {
        title: "Success !",
        message: "Reply Message was removed succesfully !"
      },
      reply: updatedMessage
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
