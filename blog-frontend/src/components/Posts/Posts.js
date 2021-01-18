import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Post from "../Post/Post";
import postService from "../../services/Posts/PostService";

import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService
      .getPosts()
      .then(response => setPosts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <section id="posts">
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <Post post={post} />{" "}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
