import { Router } from "express";
import events from "./event/event.route";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.send("Response from DevHitch Server");
});

router.use("/event", events);

export default router;
