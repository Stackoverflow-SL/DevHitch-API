import { Router } from "express";
import Controller from "./user.controller";

const participant: Router = Router();
const controller = new Controller();

participant.post("/add", controller.addUser);

export default participant;
