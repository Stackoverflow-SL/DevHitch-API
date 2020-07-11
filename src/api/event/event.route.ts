import { Router } from "express";
import Controller from "./event.controller";

const events: Router = Router();
const controller = new Controller();

// Add Event
events.post("/add", controller.addEvent);

// Update Event
events.put("/update", controller.updateEvent);

// Delete Event
events.delete("/delete/:id", controller.deleteEvent);

// Get Event By Id
events.get("/get/:id", controller.getEventById);

// Get All Events
events.get("/list", controller.getEvents);

export default events;
