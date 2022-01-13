import "./styles/App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import SignupModal from "./components/SingupModal";
import LoginModal from "./components/LoginModal";
import AddPostModal from "./components/AddPostModal";

function App() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
    setIsSignupOpen(false);
    setIsAddPostOpen(false);
    setIsLoginOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const login = (e) => {
    e.preventDefault();
  };

  const signUp = (e) => {
    e.preventDefault();

    const { username, email, password } = userData;
    if (username && email && password) {
      fetch("http://localhost:8081/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          }
          console.log(data);
        })
        .catch((e) => console.log(e));

      // setUser(userData.username);
      // setIsSignupOpen(false);
      // setUserData({
      //   username: "",
      //   email: "",
      //   password: "",
      // });
    } else {
      alert("Please fill out all the fields");
    }
  };

  return (
    <div className="app">
      <SignupModal
        open={isSignupOpen}
        handleClose={handleClose}
        username={userData.username}
        email={userData.email}
        password={userData.password}
        handleChange={(e) => handleChange(e)}
        signUp={(e) => signUp(e)}
      />
      <LoginModal
        open={isLoginOpen}
        handleClose={handleClose}
        username={userData.username}
        email={userData.email}
        password={userData.password}
        handleChange={(e) => handleChange(e)}
        login={(e) => login(e)}
      />
      <AddPostModal
        handleClose={() => handleClose()}
        isAddPostOpen={isAddPostOpen}
      />
      <Header
        setIsSignupOpen={setIsSignupOpen}
        setIsAddPostOpen={setIsAddPostOpen}
        user={user}
        setUser={setUser}
      />
      <div className="post_section">{postList}</div>
    </div>
  );
}

export default App;
