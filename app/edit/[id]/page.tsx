import { connectDB } from "@/util/database";
import { ObjectId, WithId } from "mongodb";

export interface PropsType {
  params: { id: string };
  searchParams: {};
}

export default async function Edit(props: PropsType) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  return (
    <div className="p-20">
      <h4>수정페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result?.title} />
        <input name="content" defaultValue={result?.content} />
        <input name="_id" defaultValue={result?._id.toString()} hidden />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
