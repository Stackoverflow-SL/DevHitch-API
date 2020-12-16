import { Request, Response } from "express";
import * as mongodb from "mongodb";
import ErrorCodes from "../../config/error.codes";
import { MongoHelper } from "../../config/mongodb.config";
import SuccessCodes from "../../config/success.codes";
import * as responses from "../../helpers/responses.handler";
import Group from "./group.class";
import Config from "../../config/config";

const getCollection = () => {
  return MongoHelper.client
    .db(Config.DB_NAME)
    .collection(Config.GROUPS_COLLECTION);
};

export default class GroupController {
  /**
   * Add Group
   * @param req
   * @param res
   */
  public addGroup = async (req: Request, res: Response): Promise<any> => {
    const requestData = req.body;
    let collection: any;

    try {
      collection = getCollection();

      const group = new Group(requestData);

      collection
        .insertOne(group)
        .then(() => {
          res
            .status(200)
            .send(responses.success(SuccessCodes.SUCCESSFULLY_DATA_ADDED));
          res.end();
        })
        .catch((err: any) => {
          console.error(err);
          res.send(responses.failed(ErrorCodes.INTERNAL_ERROR, 500));
        });
    } catch (e) {
      return res.send(responses.failed(ErrorCodes.INTERNAL_ERROR, 500));
    }
  };

  /**
   * Update Group
   * @param req
   * @param res
   */
  public updateGroup = async (req: Request, res: Response): Promise<any> => {
    const { _id, name, location, organizer, coOrganizers, image } = req.body;
    let collection: any;

    try {
      collection = getCollection();

      collection
        .findOneAndUpdate(
          {
            _id: new mongodb.ObjectId(_id),
          },
          {
            $set: {
              name,
              location,
              organizer,
              coOrganizers,
              image,
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
    } catch (e) {
      return res.send(responses.failed(ErrorCodes.INTERNAL_ERROR, 500));
    }
  };

  /**
   * Delete Group
   * @param req
   * @param res
   */
  public deleteGroup = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    let collection: any;

    try {
      collection = getCollection();

      collection
        .deleteOne({ _id: new mongodb.ObjectId(id) })
        .then(() => {
          res.send(responses.success(SuccessCodes.SUCCESSFULLY_DATA_DELETED));
        })
        .catch((err: any) => {
          console.error(err);
          res.send(responses.failed(ErrorCodes.INTERNAL_ERROR));
        });
    } catch (e) {
      return res.send(responses.failed(ErrorCodes.INTERNAL_ERROR, 500));
    }
  };

  /**
   * Get Group By Id
   * @param req
   * @param res
   */
  public getGroupById = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    let collection: any;

    try {
      collection = getCollection();

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
    } catch (e) {
      return res.send(responses.failed(ErrorCodes.INTERNAL_ERROR, 500));
    }
  };

  /**
   * Get Groups List
   * @param req
   * @param res
   */
  public getGroups = async (req: Request, res: Response): Promise<any> => {
    let collection: any;

    try {
      collection = getCollection();

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
