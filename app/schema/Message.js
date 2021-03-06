import mongoose, { Mongoose } from "mongoose";
import timestamps from "mongoose-timestamp";
import paginate from "mongoose-paginate";

const schema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  message: String
});

schema.plugin(timestamps, {
  createdAt: "createdAt",
  updatedAt: "updatedAt"
});
schema.plugin(paginate);

const Messsage = mongoose.model("messages", schema);
export default Messsage;
