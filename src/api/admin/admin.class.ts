import * as mongoose from "mongoose";
import { IAdmin } from "./admin.interface";

export const AdminSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
