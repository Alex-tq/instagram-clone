import React from "react";
import Modal from "@mui/material/Modal";
import "../styles/Modal.css";

function AddPostModal({ isAddPostOpen, handleClose }) {
  return (
    <div className="modal">
      <Modal open={isAddPostOpen} onClose={handleClose}>
        <div className="modal_content">post</div>
      </Modal>
    </div>
  );
}

export default AddPostModal;
