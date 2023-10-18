import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (session) {
    req.body.author = session.user.email;
  } else {
    console.log("로그인 안됨");
  }

  if (req.method === "POST") {
    if (req.body.title === "" || req.body.content === "") {
      return res.status(500).json("Title or Content is empty");
    }

    try {
      // DB 연결 후 insertOne을 통해 Data 전송(post)
      const db = (await connectDB).db("forum");
      await db.collection("post").insertOne(req.body);

      res.redirect(302, "/list");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
