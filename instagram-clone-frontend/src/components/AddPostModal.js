import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "../styles/Modal.css";
import { Button } from "@mui/material";

function AddPostModal({ isAddPostOpen, handleClose }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    //TODO
    console.log(`${image.name} was uploaded`);
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
          <input onChange={handleChange} type="file" name="upload" id="" />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </Modal>
    </div>
  );
}

export default AddPostModal;
