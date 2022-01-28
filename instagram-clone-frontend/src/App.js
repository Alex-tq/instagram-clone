import "./styles/App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import SignupModal from "./components/SingupModal";
import LoginModal from "./components/LoginModal";
import AddPostModal from "./components/AddPostModal";
import baseUrl from "./utills";
import axios from "axios";

function App() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
    verify();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(baseUrl + "sync");
    setPosts(data.reverse());
  };

  const verify = async () => {
    const getUser = await axios.get(baseUrl + "verify").then((data) => {
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
        setUser(data.username);
      }
    });
  };

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
    const { username, password } = userData;

    if (username && password) {
      axios
        .post(baseUrl + "login", { ...userData })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setIsLoginOpen(false);
            setIsLoggedIn(true);
            setUser(userData.username);
            setUserData({
              username: "",
              email: "",
              password: "",
            });

            //alert(data.success);
          }
        })
        .catch((e) => {
          alert("Check your credentials and try again");
        });
    }
  };

  const signUp = (e) => {
    e.preventDefault();

    const { username, email, password } = userData;
    if (username && email && password) {
      axios
        .post(baseUrl + "signup", { ...userData })
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setIsLoggedIn(true);
            setIsSignupOpen(false);
            setUser(data.username);
            setUserData({
              username: "",
              email: "",
              password: "",
            });
            console.log(data);
          }
        })
        .catch((e) => console.log(e));
    } else {
      alert("Please fill out all the fields");
    }
  };

  const logOut = () => {
    axios.get(baseUrl + "logout");
    setIsLoggedIn(false);
    setUser(null);
  };

  const postList = posts.map(
    ({ imgUrl, avatarUrl, username, comments, caption, _id }) => (
      <Post
        key={_id}
        id={_id}
        avatarUrl={avatarUrl}
        username={username}
        user={user}
        caption={caption}
        comments={comments}
        imgUrl={imgUrl}
        isLoggedIn={isLoggedIn}
        fetchData={fetchData}
      />
    )
  );
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
        setIsAddPostOpen={setIsAddPostOpen}
        username={user}
        fetchData={fetchData}
      />
      <Header
        logOut={logOut}
        isLoggedIn={isLoggedIn}
        setIsSignupOpen={setIsSignupOpen}
        setIsAddPostOpen={setIsAddPostOpen}
        setIsLoginOpen={setIsLoginOpen}
        user={user}
        setUser={setUser}
      />
      <div className="post_section">{postList}</div>
    </div>
  );
}

export default App;
