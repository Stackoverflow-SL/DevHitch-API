import * as mongoose from "mongoose";
import { IParticipant } from "./participant.interface";

export const ParticipantSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  joinedGroups: { type: [], required: false },
  bio: { type: String },
});

const Participant = mongoose.model<IParticipant>("User", ParticipantSchema);
export default Participant;
