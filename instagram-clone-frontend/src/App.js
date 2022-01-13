import "./styles/App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import Modal from "./components/Modal";
import { Button } from "@mui/material";
import AddPostModal from "./components/AddPostModal";

function App() {
  const [open, setOpen] = useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8081/sync");
      const data = await res.json();
      setPosts(data);
    };
    fetchData();
  }, []);

  const postList = posts.map(({ imgUrl, avatarUrl, username, caption }) => (
    <Post
      key={username}
      avatarUrl={avatarUrl}
      username={username}
      caption={caption}
      imgUrl={imgUrl}
    />
  ));

  const handleClose = () => {
    setOpen(false);
    setIsAddPostOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const signUp = (e) => {
    e.preventDefault();
    console.log(userData.username + " signed up");

    const { username, email, password } = userData;
    if (username && email && password) {
      setUser(userData.username);
      setOpen(false);
      setUserData({
        username: "",
        email: "",
        password: "",
      });
    } else {
      alert("Please fill out all the fields");
    }
  };

  return (
    <div className="app">
      <Modal
        open={open}
        handleClose={handleClose}
        username={userData.username}
        email={userData.email}
        password={userData.password}
        handleChange={(e) => handleChange(e)}
        signUp={(e) => signUp(e)}
      />
      <AddPostModal
        handleClose={() => handleClose()}
        isAddPostOpen={isAddPostOpen}
      />
      <Header
        setOpen={setOpen}
        setIsAddPostOpen={setIsAddPostOpen}
        user={user}
        setUser={setUser}
      />
      <div className="post_section">{postList}</div>
    </div>
  );
}

export default App;
