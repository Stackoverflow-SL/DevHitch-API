import { Request, Response } from "express";
import { MongoHelper } from "../../config/mongodb.config";

const getCollection = () => {
  return MongoHelper.client.db("devhitch").collection("groups");
};

export default class GroupController {}
