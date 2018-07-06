import mongoose, { Mongoose } from "mongoose";
import timestamps from "mongoose-timestamp";
import paginate from "mongoose-paginate";

const schema = mongoose.Schema({
  user: String,
  message: String,
  replies: [
    {
      user: String,
      message: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
});

schema.plugin(timestamps, {
  createdAt: "createdAt",
  updatedAt: "updatedAt"
});
schema.plugin(paginate);

const Messsage = mongoose.model("messages", schema);
export default Messsage;
