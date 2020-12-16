import { Router } from "express";
import admin from "./admin/admin.route";
import event from "./event/event.route";
import user from "./user/user.route";
import group from "./group/group.route";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.send("Response from DevHitch Server");
});

router.use("/admin", admin);
router.use("/event", event);
router.use("/user", user);
router.use("/group", group);

export default router;
