import { Router } from "express";
import Controller from "./participant.controller";

const participant: Router = Router();
const controller = new Controller();

participant.post("/add", controller.addParticipant);

export default participant;
