import * as mongoose from "mongoose";
import { IGroup } from "./group.interface";

export const GroupSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
});

const Group = mongoose.model<IGroup>("Group", GroupSchema);
export default Group;
