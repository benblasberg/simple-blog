import React from "react";
import "./Post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.author.name}</p>
    </div>
  );
}
