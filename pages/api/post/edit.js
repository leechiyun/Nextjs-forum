import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.title === "" || req.body.content === "") {
      return res.status(500).json("Title or Content is empty");
    }

    try {
      // DB 연결 후 updateOne 통해 Data 전송(post)
      const db = (await connectDB).db("forum");
      await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: { title: req.body.title, content: req.body.content } }
        );

      res.redirect(302, "/list");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
