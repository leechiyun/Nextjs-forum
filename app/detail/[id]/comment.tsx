"use client";
import { useState } from "react";
import CommentList from "./commentList";
import axios from "axios";

export interface PropsType {
  id: string | undefined;
}

export default function Comment(props: PropsType) {
  const [comment, setComment] = useState<string>("");

  const commentInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <CommentList parent_id={props.id} />
      <input onChange={commentInputHandler} value={comment} />
      <button
        onClick={() => {
          fetch(`/api/post/new-comment`, {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: props.id }),
          });
          // Input reset
          setComment("");
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
