import React from "react";
import "../styles/Header.css";
import Button from "@mui/material/Button";

function Header({ setUser, setOpen, user }) {
  return (
    <div className="app__header">
      <img
        className="app__headerImage"
        src="https://www.pinclipart.com/picdir/big/59-590993_follow-us-on-instagram-logo-png-clipart.png"
        alt="instagram logo"
      />
      {user ? (
        <Button
          onClick={() => {
            setUser(null);
          }}
        >
          Log Out
        </Button>
      ) : (
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
      )}
    </div>
  );
}

export default Header;
