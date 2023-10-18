import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.id === "" || req.body.password === "") {
      return res.status(500).json("Id or password is empty");
    }

    try {
      // DB 연결 후 insertOne을 통해 Data 전송(post)
      const db = (await connectDB).db("forum");
      await db.collection("sign-up").insertOne(req.body);

      res.redirect(302, "/list");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
