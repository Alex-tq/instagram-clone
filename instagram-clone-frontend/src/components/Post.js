import React from "react";
import "../styles/Post.css";
import Avatar from "@mui/material/Avatar";

function Post() {
  return (
    <div className="post">
      <Avatar
        className="post_avatar"
        alt="avatar"
        src="https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
      />
      <h3>username</h3>

      <img
        src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
        alt=""
        className="post_image"
      />

      <p>
        <strong>Username:</strong> this is a caption
      </p>
    </div>
  );
}

export default Post;
