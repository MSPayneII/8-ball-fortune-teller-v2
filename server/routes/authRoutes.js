import express from "express";

const router = express.Router();

import { register, login, updateUser } from "../controllers/authController.js";
import verifyUser from "../middleware/verifyUser.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(verifyUser, updateUser);

export default router;
