import React from "react";
import "../styles/Header.css";
import Button from "@mui/material/Button";
import AddCircle from "@mui/icons-material/AddCircleOutline";

function Header({
  setUser,
  setIsLoginOpen,
  setIsSignupOpen,
  user,
  setIsAddPostOpen,
}) {
  return (
    <div className="app__header">
      <img
        className="app__headerImage"
        src="https://www.pinclipart.com/picdir/big/59-590993_follow-us-on-instagram-logo-png-clipart.png"
        alt="instagram logo"
      />
      <div className="header_buttons">
        {user && (
          <Button onClick={() => setIsAddPostOpen(true)}>
            <AddCircle />
          </Button>
        )}
        {user ? (
          <Button
            onClick={() => {
              setUser(null);
            }}
          >
            Log Out
          </Button>
        ) : (
          <>
            <Button onClick={() => setIsSignupOpen(true)}>Sign Up</Button>
            <Button onClick={() => setIsLoginOpen(true)}>Log IN</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
