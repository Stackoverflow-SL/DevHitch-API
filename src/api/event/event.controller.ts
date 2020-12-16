import { Request, Response } from "express";
import * as mongodb from "mongodb";
import ErrorCodes from "../../config/error.codes";
import { MongoHelper } from "../../config/mongodb.config";
import SuccessCodes from "../../config/success.codes";
import * as responses from "../../helpers/responses.handler";
import Event from "./event.class";
import Config from "../../config/config";

const getCollection = () => {
  return MongoHelper.client
    .db(Config.DB_NAME)
    .collection(Config.EVENTS_COLLECTION);
};

export default class EventController {
  /**
   * Add Event
   * @returns success or failure
   * @param req
   * @param res
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
   * Update Event
   * @returns success or failure
   * @param req
   * @param res
   */
  public updateEvent = async (req: Request, res: Response): Promise<any> => {
    const {
      _id,
      title,
      dateTime,
      image,
      organizer,
      participants,
      type,
    } = req.body;
    const collection: any = getCollection();

    collection
      .findOneAndUpdate(
        {
          _id: new mongodb.ObjectId(_id),
        },
        {
          $set: {
            title,
            dateTime,
            image,
            organizer,
            participants,
            type,
          },
        }
      )
      .then(() => {
        res.send(responses.success(SuccessCodes.SUCCESSFULLY_DATA_UPDATED));
      })
      .catch((err: any) => {
        console.error(ErrorCodes.USER_UPDATE_FAILED, err);
        res.send(responses.failed(ErrorCodes.DATA_UPDATE_FAILED));
      });
  };

  /**
   * Delete Event
   * @returns success or failure
   * @param req
   * @param res
   */
  public deleteEvent = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const collection: any = getCollection();

    collection
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then(() => {
        res.send(responses.success(SuccessCodes.SUCCESSFULLY_DATA_DELETED));
      })
      .catch((err: any) => {
        console.error(err);
        res.send(responses.failed(ErrorCodes.INTERNAL_ERROR));
      });
  };

  /**
   * Get Event By Id
   * @param req
   * @param res
   */
  public getEventById = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const collection: any = getCollection();

    collection
      .findOne({ _id: id })
      .then((data: any) => {
        res.send(
          responses.successWithPayload(
            SuccessCodes.SUCCESSFULLY_DATA_RETRIEVED,
            data
          )
        );
      })
      .catch((err: any) => {
        console.error(err);
        res.send(responses.failed(ErrorCodes.INTERNAL_ERROR, 500));
      });
  };

  /**
   * Get All Events
   * @returns events list
   */
  public getEvents = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();

    try {
      collection.find({}).toArray((err: any, items: any[]) => {
        if (err) {
          console.error("Caught error", err);
          res
            .status(500)
            .send(responses.failed(ErrorCodes.INTERNAL_ERROR, 500));
          res.end();
        } else {
          res
            .status(200)
            .send(
              responses.successWithPayload(
                SuccessCodes.SUCCESSFULLY_DATA_RETRIEVED,
                items
              )
            );
        }
      });
    } catch (err) {
      console.error(err);
      res.send(responses.failed(ErrorCodes.INTERNAL_ERROR, 500));
    }
  };
}
