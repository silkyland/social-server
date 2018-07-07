import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import { auth, message, user, reply } from "./app/routers";
import passport from "./app/passport";
//run db connect
import "./app/core/connect";
import Message from "./app/schema/Message";
import User from "./app/schema/User";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(logger("dev"));

app.use("/auth", auth);
app.use("/user", passport.authenticate("jwt", { session: false }), user);
app.use("/message", passport.authenticate("jwt", { session: false }), message);
app.use("/reply", passport.authenticate("jwt", { session: false }), reply);
app.get("/", (req, res) => {
  return res.json({
    title: "Welcome",
    message: "Your Server is running well",
    author: "Bundit Nuntates",
    version: "0.1-beta"
  });
});

app.get("/messages", async (req, res) => {
  // SELECT * FROM messages
  let messages = await Message.aggregate([
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
  res.json(messages);
});

app.post("/message", async (req, res) => {
  let message = await Message.aggregate[{ $match: { _id: req.body.id } }];
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
