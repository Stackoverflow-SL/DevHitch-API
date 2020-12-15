import { Request, Response } from "express";
import { MongoHelper } from "../../config/mongodb.config";
import Participant from "./participant.class";

const getCollection = () => {
  return MongoHelper.client.db("devhitch").collection("participants");
};

export default class ParticipantController {
  /**
   * Add User
   * @param req
   * @param res
   */
  public addParticipant = async (req: Request, res: Response): Promise<any> => {
    const requestData = req.body;
    const collection: any = getCollection();

    const participant = new Participant(requestData);

    collection
      .insertOne(participant)
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
