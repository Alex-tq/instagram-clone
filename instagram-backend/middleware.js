import session from "express-session";

export const isSignedIn = (req, res, next) => {
  if (!session.isLoggedIn) {
    console.log("not auth");
    return res.send({ notLoggedIn: true });
  }
  next();
};
