import * as mongoose from "mongoose";
import { IUser } from "./user.interface";

export const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  joinedGroups: { type: [], required: false },
  bio: { type: String },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
