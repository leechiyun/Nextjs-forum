import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      let session = await getServerSession(req, res, authOptions);

      const db = (await connectDB).db("forum");
      let find = await db
        .collection("post")
        .findOne({ _id: new ObjectId(req.body) });
      if (find.author === session.user.email) {
        let result = await db
          .collection("post")
          .deleteOne({ _id: new ObjectId(req.body) });
        return res.status(200).json(result);
      } else {
        return res.status(500).json("삭제 권한 없음");
      }
    } catch (error) {
      return res.status(500);
    }
  }
  return res.status(500);
}
