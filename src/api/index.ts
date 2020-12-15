import { Router } from "express";
import events from "./event/event.route";
import participant from "./user/user.route";
import group from "./group/group.route";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.send("Response from DevHitch Server");
});

router.use("/event", events);
router.use("/user", participant);
router.use("/group", group);

export default router;
