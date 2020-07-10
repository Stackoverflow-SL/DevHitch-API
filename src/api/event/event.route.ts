import { Router } from "express";
import Controller from "./event.controller";

const events: Router = Router();
const controller = new Controller();

// Add Event
events.post("/add", controller.addEvent);

// Get All Events
events.get("/list", controller.getEvents);

export default events;
