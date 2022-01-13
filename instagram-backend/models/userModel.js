import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({});

UserSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model("UserModel", UserSchema);
export default userModel;
