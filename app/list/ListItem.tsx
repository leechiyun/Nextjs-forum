"use client";
import Link from "next/link";
import React, { useState } from "react";

// props 타입 지정
interface ListItemProps {
  result: Array<{ _id: string; title: string; content: string }>;
}

export default function ListItem({ result }: ListItemProps) {
  return (
    <>
      {result.map((item, idx) => {
        return (
          <div className={`list-item`} key={idx}>
            <Link href={`/detail/${item._id}`}>
              <h4>{item.title}</h4>
            </Link>
            <Link href={"/edit/" + item._id} className="list-btn">
              ✏️
            </Link>
            <button
              onClick={(e: React.MouseEvent) => {
                fetch("/api/delete/list", {
                  method: "DELETE",
                  body: item._id,
                })
                  .then((res) => {
                    if (res.ok) {
                      const eventTarget = e.target as HTMLElement;
                      const parentElement =
                        eventTarget.parentElement as HTMLDivElement;
                      parentElement.style.opacity = "0";
                      setTimeout(() => {
                        parentElement.style.display = "none";
                      }, 1000);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              🗑️
            </button>
            <p>{item.content}</p>
          </div>
        );
      })}
    </>
  );
}
