import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    .find({ parent_id: new ObjectId(req.query.id) })
    .toArray();

  if (req.method === "GET") {
    return res.status(200).json(result);
  }
  return res.status(400);
}
