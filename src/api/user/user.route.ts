import { Router } from "express";
import Controller from "./user.controller";

const user: Router = Router();
const controller = new Controller();

user.post("/add", controller.addUser);
user.put("/update", controller.updateUser);
user.delete("/delete/:id", controller.deleteUser);
user.get("/get/:id", controller.getUserById);
user.get("/list", controller.getUsers);

export default user;
