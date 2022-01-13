import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  username: String,
  caption: String,
  imgUrl: String,
  comments: [],
});

export default mongoose.model("posts", postSchema);
