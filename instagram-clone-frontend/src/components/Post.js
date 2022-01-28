import React, { useState } from "react";
import "../styles/Post.css";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import baseUrl from "../utills";

function Post({
  username = "Anonimous",
  user,
  id,
  caption = "",
  comments,
  imgUrl = "",
  avatarUrl = "",
  isLoggedIn,
  fetchData,
}) {
  const [comment, setComment] = useState({
    author: user,
    text: "",
    id: null,
  });

  const handleChange = (e) => {
    const { value } = e.target;

    setComment((prev) => ({ ...prev, text: value }));
  };

  const makeComment = () => {
    const newComment = {
      id,
      comment: { ...comment, author: user, id: Date.now().toString() },
    };
    if (!isLoggedIn) {
      alert("Must log in to make comments");
      return;
    }

    if (comment.text) {
      setComment({
        author: user,
        text: "",
        id: null,
      });
      axios
        .put(baseUrl + "comment", {
          newComment,
        })
        .then(() => {
          fetchData();
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
        {comments &&
          comments.map((comment) => {
            return (
              <p key={comment.id} className="comment">
                <strong>{comment.author} </strong> {comment.text}
              </p>
            );
          })}

        <div className="comment_form">
          <input
            onChange={handleChange}
            type="text"
            name="comment"
            id=""
            value={comment.text}
          />
          <button onClick={makeComment}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
