import React from "react";
import "../styles/Post.css";
import Avatar from "@mui/material/Avatar";

function Post({ username, caption, imgUrl, avatarUrl }) {
  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt="User avatar" src={avatarUrl} />
        <h3>{username}</h3>
      </div>

      <img src={imgUrl} alt="" className="post_image" />

      <p className="caption">
        <strong>{username} </strong> {`: ${caption}`}
      </p>
    </div>
  );
}

export default Post;
