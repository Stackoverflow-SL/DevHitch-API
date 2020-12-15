import { Router } from "express";
import events from "./event/event.route";
import participant from "./participant/participant.route";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.send("Response from DevHitch Server");
});

router.use("/event", events);
router.use("/participant", participant);

export default router;
