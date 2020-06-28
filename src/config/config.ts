import * as dotenv from "dotenv";
import { DB_SECRET } from "../secrets/token";
dotenv.config();

const db_secret = DB_SECRET;

export default {
  PORT: "4000",
  MONGO_DB_URI:
    "mongodb://devhitch:" +
    db_secret +
    "==@devhitch.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@devhitch@",
};
