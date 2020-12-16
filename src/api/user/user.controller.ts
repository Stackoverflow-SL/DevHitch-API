import { Request, Response } from "express";
import * as mongodb from "mongodb";
import ErrorCodes from "../../config/error.codes";
import { MongoHelper } from "../../config/mongodb.config";
import SuccessCodes from "../../config/success.codes";
import * as responses from "../../helpers/responses.handler";
import User from "./user.class";
import Config from "../../config/config";

const getCollection = () => {
  return MongoHelper.client
    .db(Config.DB_NAME)
    .collection(Config.USERS_COLLECTION);
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
        res
          .status(200)
          .send(responses.success(SuccessCodes.SUCCESSFULLY_DATA_ADDED));
        res.end();
      })
      .catch((err: any) => {
        console.error(err);
        res.send(responses.failed(ErrorCodes.INTERNAL_ERROR, 500));
      });
  };

  /**
   * Update User
   * @param req
   * @param res
   */
  public updateUser = async (req: Request, res: Response): Promise<any> => {
    const {
      _id,
      firstName,
      lastName,
      email,
      password,
      image,
      location,
      joinedGroups,
      bio,
    } = req.body;
    const collection: any = getCollection();

    collection
      .findOneAndUpdate(
        {
          _id: new mongodb.ObjectId(_id),
        },
        {
          $set: {
            firstName,
            lastName,
            email,
            password,
            image,
            location,
            joinedGroups,
            bio,
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
   * Delete User
   * @param req
   * @param res
   */
  public deleteUser = async (req: Request, res: Response): Promise<any> => {
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
   * Get User By Id
   * @param req
   * @param res
   */
  public getUserById = async (req: Request, res: Response): Promise<any> => {
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
   * Get Users list
   * @param req
   * @param res
   */
  public getUsers = async (req: Request, res: Response): Promise<any> => {
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
