import React from "react";
import SignupModal from "@mui/material/Modal";
import "../styles/Modal.css";
import { Input } from "@mui/material";
import { Button } from "@mui/material";

function Modal({
  open,
  handleClose,
  signUp,
  email,
  password,
  username,
  handleChange,
}) {
  return (
    <div className="modal">
      <SignupModal open={open} onClose={handleClose}>
        <div className="modal_content">
          <form className="signup_form">
            <div className="modal_logo">
              <img
                className="modal__logoImage"
                src="https://www.pinclipart.com/picdir/big/59-590993_follow-us-on-instagram-logo-png-clipart.png"
                alt="instagram logo"
              />
            </div>
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
            <Button onClick={signUp}>Sing Up</Button>
          </form>
        </div>
      </SignupModal>
    </div>
  );
}

export default Modal;
