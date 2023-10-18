import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  req.body = JSON.parse(req.body);
  if (session) {
    req.body.author = session.user.email;
  } else {
    console.log("로그인 안됨");
  }

  if (req.method === "POST") {
    if (req.body.comment === "") {
      return res.status(500).json("Comment is empty");
    }
    console.log(req.body);

    try {
      const save = {
        content: req.body.comment,
        author: req.body.author,
        parent_id: new ObjectId(req.body._id),
        created_date: new Date(),
      };

      // DB 연결 후 insertOne을 통해 Data 전송(post)
      const db = (await connectDB).db("forum");
      await db.collection("comment").insertOne(save);

      res.status(200).json("댓글 저장 완료");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
