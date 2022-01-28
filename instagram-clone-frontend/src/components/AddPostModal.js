import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "../styles/Modal.css";
import { Button } from "@mui/material";
import axios from "axios";
import baseUrl from "../utills";

function AddPostModal({
  isAddPostOpen,
  setIsAddPostOpen,
  handleClose,
  username,
  fetchData,
}) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();

    if (!image) {
      alert("please select a file");
      return;
    }

    const data = new FormData();
    data.append("caption", caption);
    data.append("username", username);
    data.append("image", image);

    setIsAddPostOpen(false);
    console.log(data);

    axios.post(baseUrl + "upload", data).then((res) => {
      console.log(res);
      setImage(null);
      fetchData();
    });
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
