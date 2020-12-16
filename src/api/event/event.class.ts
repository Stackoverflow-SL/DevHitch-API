import * as mongoose from "mongoose";
import { IEvent } from "./event.interface";

export const EventSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  dateTime: { type: String, required: true },
  image: { type: String },
  organizer: { type: String, required: true },
  participants: { type: Array<string>() },
  type: { type: String },
});

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;
