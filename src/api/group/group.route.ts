import { Router } from "express";
import Controller from "./group.controller";

const group: Router = Router();
const controller = new Controller();

// group.post("/add", controller)

export default group;
