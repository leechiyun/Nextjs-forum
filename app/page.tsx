import { connectDB } from "@/util/database";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");
  const arr = await db.collection("post").find().toArray();

  return <div>안녕</div>;
}
