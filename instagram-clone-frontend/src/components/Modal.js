import React from "react";
import SignupModal from "@mui/material/Modal";
import "../styles/Modal.css";
import { Input } from "@mui/material";

function Modal({ open, handleClose, email, password, username, handleChange }) {
  return (
    <div className="modal">
      <SignupModal open={open} onClose={handleClose}>
        <div className="modal_content">
          <form className="signup_form">
            <h3>Sign Up</h3>
            <Input
              type="text"
              placeholder="usename"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </form>
        </div>
      </SignupModal>
    </div>
  );
}

export default Modal;
