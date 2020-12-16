import * as mongoose from "mongoose";

export interface IEvent extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  dateTime: string;
  image: string;
  organizer: string;
  participants: string[];
  type: string;
}
