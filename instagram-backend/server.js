import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postModel from "./models/postModel.js";
import userModel from "./models/userModel.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import { isSignedIn } from "./middleware.js";

dotenv.config();

const PORT = process.env.PORT || 8081;
const app = express();

const URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(express.json());

const sessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

mongoose.connect(URI, {
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});

app.get("/", (req, res) => {
  res.status(200).send("Hello Instagram Clone");
});

app.get("/verify", (req, res) => {
  // console.log("IN VERIFY ROUTE req.session: ", req.user);
  // console.log("IN VERIFY ROUTE: ", req.isAuthenticated());
  // console.log(session.username);
  // console.log(session.isLoggedIn);
  res.send({ isLoggedIn: session.isLoggedIn, username: session.username });
});

app.get("/logout", (req, res) => {
  console.log("logging out");
  //console.log(Object.keys(req));
  req.logout();
  session.username = null;
  session.isLoggedIn = false;
});

app.post("/signup", async (req, res, next) => {
  console.log("signing up ");
  // console.log(Object.keys(req));
  const { username, password } = req.body;
  try {
    const user = await new userModel({ username: username });
    const newUser = await userModel.register(user, password);
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      console.log("signed up ", req.user.username);
      res.send({ username });
    });

    session.username = username;
    session.isLoggedIn = req.isAuthenticated();
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  try {
    //console.log("req.session on login", req.session);
    // console.log("you're in", req.user);
    // console.log(Object.keys(req));
    session.username = req.user.username;
    session.isLoggedIn = req.isAuthenticated();
    res.status(201).send({ success: "You are logged In" });
  } catch (e) {
    console.log(e.message);
    res.send({ error: e.message });
  }
});

app.post("/upload", isSignedIn, (req, res) => {
  const { body } = req;
  // console.log("uploading", req.user);
  // console.log(Object.keys(req));

  postModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/sync", (req, res) => {
  postModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
