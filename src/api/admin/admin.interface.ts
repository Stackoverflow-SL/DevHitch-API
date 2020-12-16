import * as mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
