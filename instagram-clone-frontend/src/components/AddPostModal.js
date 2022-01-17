import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "../styles/Modal.css";
import { Button } from "@mui/material";
import axios from "axios";

function AddPostModal({ isAddPostOpen, setIsAddPostOpen, handleClose }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const testUpload = {
    username: "petse",
    caption: "This is another caption",
    imgUrl:
      "https://images.unsplash.com/photo-1642034554560-a344b6f059dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    comments: [],
  };

  const handleUpload = (e) => {
    //TODO
    e.preventDefault();

    const data = new FormData();
    data.append("caption", caption);
    data.append("image", image);

    setIsAddPostOpen(false);
    console.log(data);

    axios
      .post("https://httpbin.org/anything", data)
      .then((res) => console.log(res));

    // fetch("https://httpbin.org/anything", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    // .then((res) => res.json())
    // .then((data) => console.log(data));
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "caption") {
      setCaption(value);
    } else {
      if (files[0]) {
        setImage(files[0]);
      }
    }
  };
  return (
    <div className="modal">
      <Modal open={isAddPostOpen} onClose={handleClose}>
        <div className="modal_content">
          <input
            value={caption}
            onChange={handleChange}
            type="text"
            name="caption"
            placeholder="Enter a caption"
          />
          <input onChange={handleChange} type="file" name="image" id="image" />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </Modal>
    </div>
  );
}

export default AddPostModal;
