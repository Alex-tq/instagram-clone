import React, { useState } from "react";
import "../styles/Post.css";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

function Post({
  username = "Anonimous",
  id,
  caption = "",
  imgUrl = "",
  avatarUrl = "",
  isLoggedIn,
}) {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setComment(value);
  };

  const makePost = async () => {
    const newComment = { id, comment };

    if (!isLoggedIn) {
      alert("Must log in to make comments");
      return;
    }

    if (comment) {
      setComment("");
      const res = await axios.put("http://localhost:8081/comment", {
        newComment,
      });
    } else {
      alert("must write a comment first");
    }
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          sx={{ bgcolor: "#f0f" }}
          className="post_avatar"
          alt="User avatar"
          src={avatarUrl}
        >
          {username[0]}
        </Avatar>
        <h3>{username}</h3>
      </div>

      <img src={imgUrl} alt="" className="post_image" />

      <p className="caption">
        <strong>{username} </strong> {`: ${caption}`}
      </p>
      <div className="comment_section">
        <p className="comment">
          <strong>SomeUser </strong> Some comment
        </p>
        <p className="comment">
          <strong>SomeUser </strong> Some comment
        </p>
        <p className="comment">
          <strong>SomeUser </strong> Some comment
        </p>
        <div className="comment_form">
          <input
            onChange={handleChange}
            type="text"
            name="comment"
            id=""
            value={comment}
          />
          <button onClick={makePost}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
