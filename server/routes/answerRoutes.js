import express from "express";

const router = express.Router();

import {
  randomFortune,
  createQAPair,
  getQAPairs,
} from "../controllers/answerController.js";
import verifyUser from "../middleware/verifyUser.js";

router.route("/randomFortune").get(randomFortune);
router.route("/createQAPair").post(verifyUser, createQAPair);
router.route("/getQAPairs").get(verifyUser, getQAPairs);

export default router;
