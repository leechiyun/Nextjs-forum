"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export interface PropsType {
  parent_id: string | undefined;
}

export interface CommentType {
  author: string;
  content: string;
  _id: string;
  parent_id: string;
}

export default function CommentList(props: PropsType) {
  const [comment, setComment] = useState<Array<CommentType>>([]);

  useEffect(() => {
    // 댓글 전체 조회
    axios
      .get(`/api/get/comment-all?id=${props.parent_id?.toString()}`)
      .then((res) => {
        console.log(res.data);
        setComment(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.parent_id]);

  return (
    <div>
      <div className="border-y-2 border-black p-3">댓글 목록</div>
      {comment.length > 0
        ? comment.map((item, idx) => {
            return (
              <div className="border m-3" key={idx}>
                <p>{item.author}</p>
                <p className="border-dashed  border-t-2">{item.content}</p>
              </div>
            );
          })
        : "댓글 없음"}
    </div>
  );
}
