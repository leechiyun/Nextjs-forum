import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (
      req.body.name === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      return res.status(500).json("입력값을 제대로 입력해주세요");
    }
    let db = (await connectDB).db("forum");

    // email 중복확인
    let find = await db
      .collection("user_cred")
      .findOne({ email: req.body.email });
    if (!find) {
      let hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;

      await db.collection("user_cred").insertOne(req.body);

      return res.status(200).json("가입 성공");
    } else {
      return res.status(500).json("중복 이메일");
    }
  }
}
