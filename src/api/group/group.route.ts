import { Router } from "express";
import Controller from "./group.controller";

const group: Router = Router();
const controller = new Controller();

group.post("/add", controller.addGroup);
group.put("/update", controller.updateGroup);
group.delete("/delete/:id", controller.deleteGroup);
group.get("/get/:id", controller.getGroupById);
group.get("/list", controller.getGroups);

export default group;
