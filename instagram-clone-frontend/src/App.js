import "./styles/App.css";
import { useState } from "react";
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
  const [posts, setPost] = useState([
    {
      avatarUrl:
        "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      username: "User1",
      caption: "this is the post caption",
      imgUrl:
        "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
    },
    {
      avatarUrl:
        "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGZ1bm55fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      username: "User2",
      caption: "this is the post caption",
      imgUrl:
        "https://images.unsplash.com/photo-1596727147705-61a532a659bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFydmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      avatarUrl:
        "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      username: "User3",
      caption: "this is the post caption",
      imgUrl:
        "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVubnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    },
  ]);

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
