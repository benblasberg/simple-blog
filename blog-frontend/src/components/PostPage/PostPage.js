import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

import postService from "../../services/Posts/PostService";
import "./PostPage.css";

export default function PostPage() {
  const [post, setPost] = useState({});
  let { id } = useParams();

  useEffect(() => {
    postService
      .findPostById(id)
      .then(response => setPost(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="post-page">
      <div className="container">
        <section className="title">
          <h2>{post.title}</h2>
        </section>
        <section className="author">
          By {post.author && post.author.name}
        </section>
        <section className="body">
          <MDEditor.Markdown source={post.content} />
        </section>
      </div>
    </div>
  );
}
