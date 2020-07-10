import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: String;
  email: String;
  image: String;
  location: String;
  joinedGroups: [];
  bio: String;
}
