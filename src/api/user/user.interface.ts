import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  image: string;
  location: string;
  joinedGroups: [];
  bio: string;
}
