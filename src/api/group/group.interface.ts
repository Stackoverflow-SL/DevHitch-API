import * as mongoose from "mongoose";

export interface IGroup extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: String;
  location: String;
}
