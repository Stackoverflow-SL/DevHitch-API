import { Request, Response } from "express";
import * as mongodb from "mongodb";
import { MongoHelper } from "../../config/mongodb.config";
import Event from "./event.class";

const getCollection = () => {
  return MongoHelper.client.db("devhitch").collection("events");
};

export default class EventController {
  /**
   * Add Event
   * @param eventId id of the event
   * @param title title of the event
   * @param dateTime date and time of the event
   * @param image url of the event
   * @param organizer organizer of the event
   * @param participantsCount participantsCount of the event
   * @param type type of the event
   * @returns success or failure
   */
  public addEvent = async (req: Request, res: Response): Promise<any> => {
    const requestData = req.body;
    const collection: any = getCollection();

    const event = new Event(requestData);

    collection
      .insertOne(event)
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

  /**
   * Get All Events
   * @returns events list
   */
  public getEvents = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();

    collection
      .find({})
      .toArray((err: any, items: any[]) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Unable get events" });
          res.end();
          console.error("Caught error", err);
        } else {
          // items = items.map(
          //   (item: { _id: any; name: any; email: any; contactNo: any }) => {
          //     return {
          //       id: item._id,
          //       name: item.name,
          //       email: item.email,
          //       contactNo: item.contactNo,
          //     };
          //   }
          // );

          res.status(200).json({
            success: true,
            values: items,
            message: "Get all Success",
          });
        }
      })
      .catch((err: any) => {
        res.send("Unable to get clients");
        console.error(err);
      });
  };
}
