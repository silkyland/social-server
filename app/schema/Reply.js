import mongoose, { Mongoose } from "mongoose";
import timestamps from "mongoose-timestamp";

const schema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  messageId: mongoose.Schema.Types.ObjectId,
  message: String
});

schema.plugin(timestamps, {
  createdAt: "createdAt",
  updatedAt: "updatedAt"
});

const Messsage = mongoose.model("replies", schema);
export default Messsage;
