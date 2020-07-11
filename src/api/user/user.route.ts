import { Router } from "express";
import Controller from "./user.controller";

const users: Router = Router();
const controller = new Controller();

users.post("/add", controller.addUser);

export default users;
