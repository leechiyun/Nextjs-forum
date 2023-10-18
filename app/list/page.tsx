import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  // MongoDB 데이터를 원하는 형식으로 변환
  const posts = result.map((item) => ({
    _id: item._id.toString(),
    title: item.title,
    content: item.content,
  }));

  return (
    <div className="list-bg">
      <ListItem result={posts} />
    </div>
  );
}
