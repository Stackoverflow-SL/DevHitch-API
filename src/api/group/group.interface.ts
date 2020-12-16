import * as mongoose from "mongoose";

export interface IGroup extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  location: string;
  organizer: string;
  coOrganizers: string[];
  image: string;
}
