import { Router } from "express";
import events from "./event/event.route";
import user from "./user/user.route";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.send("Response from DevHitch Server");
});

router.use("/event", events);
router.use("/user", user);

export default router;
