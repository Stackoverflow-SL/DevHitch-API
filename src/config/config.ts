import * as dotenv from "dotenv";
import { DB_SECRET } from "../secrets/token";

dotenv.config();

const dbSecret = DB_SECRET;

export default {
  PORT: "4000",
  MONGO_DB_URI:
    "mongodb://devhitch:" +
    dbSecret +
    "==@devhitch.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@devhitch@",
  DB_NAME: "devhitch",
  ADMINS_COLLECTION: "admins",
  EVENTS_COLLECTION: "events",
  GROUPS_COLLECTION: "groups",
  USERS_COLLECTION: "users",
};
