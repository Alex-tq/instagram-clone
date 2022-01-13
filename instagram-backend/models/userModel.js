import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
  },
});

UserSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model("Users", UserSchema);
export default userModel;
