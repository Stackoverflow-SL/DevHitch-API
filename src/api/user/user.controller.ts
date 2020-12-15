import { Request, Response } from "express";
import { MongoHelper } from "../../config/mongodb.config";
import User from "./user.class";

const getCollection = () => {
  return MongoHelper.client.db("devhitch").collection("users");
};

export default class UserController {
  /**
   * Add User
   * @param req
   * @param res
   */
  public addUser = async (req: Request, res: Response): Promise<any> => {
    const requestData = req.body;
    const collection: any = getCollection();

    const user = new User(requestData);

    collection
      .insertOne(user)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Successfully added",
        });
        res.end();
      })
      .catch((err: any) => {
        console.error(err);
        res.send({ success: false, message: "Unable to Add" });
      });
  };
}
