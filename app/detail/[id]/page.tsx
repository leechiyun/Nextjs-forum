import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./comment";

export interface PropsType {
  params: { id: string };
  searchParams: {};
}

export default async function Detail(props: PropsType) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  return (
    <div>
      <h4>상세 페이지</h4>
      <h4>{result?.title}</h4>
      <p>{result?.content}</p>
      <Comment id={result?._id.toString()} />
    </div>
  );
}
