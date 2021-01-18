import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Redirect } from "react-router-dom";
import postService from "../../services/Posts/PostService";
import AuthUtil from "../../services/AuthUtil";
import "./CreatePost.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [tab, setTab] = useState("edit");
  const [editorHeight, setEditorHeight] = useState("");

  const submitHandler = evt => {
    evt.preventDefault();

    if (content !== "" && title !== "") {
      postService
        .createPost({
          title: title,
          content: content,
          author: { id: AuthUtil.getCurrentUser().id }
        })
        .then(() => setSubmitted(true))
        .catch(error => console.log(error));
    }
  };

  const getEditorHeight = elem => {
    if (!editorHeight && elem != null) {
      setEditorHeight(`${elem.clientHeight}px`);
    }
  };

  if (submitted) {
    return <Redirect to="/posts" />;
  }

  return (
    <form onSubmit={evt => evt.preventDefault()} className="create-post">
      <div>
        <label>Title: </label>
        <input
          className="title-input"
          minLength="1"
          required
          type="text"
          onChange={evt => setTitle(evt.target.value)}
        />
      </div>
      <div>
        <label>Content: </label>
        {tab === "edit" && (
          <div className="tab-content padded" ref={getEditorHeight}>
            <MDEditor value={content} onChange={setContent} preview="edit" />
          </div>
        )}
        {tab === "preview" && (
          <div
            className="tab-content padded"
            style={{ minHeight: editorHeight }}
          >
            <MDEditor.Markdown source={content} />
          </div>
        )}
        <div className="padded">
          <button onClick={() => setTab("preview")}>preview</button>
          <button onClick={() => setTab("edit")}>edit</button>
        </div>
      </div>
      <div>
        <input
          className="submit-btn padded"
          type="submit"
          value="Submit"
          onClick={submitHandler}
        />
      </div>
    </form>
  );
}
