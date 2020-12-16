import { Router } from "express";
import Controller from "./admin.controller";

const admin: Router = Router();
const controller = new Controller();

admin.post("/add", controller.addAdmin);
admin.put("/update", controller.updateAdmin);
admin.delete("/delete/:id", controller.deleteAdmin);
admin.get("/get/:id", controller.getAdminById);
admin.get("/list", controller.getAdmins);

export default admin;
