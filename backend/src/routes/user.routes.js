import express from "express";
import {
  addFriend,
  checkAuth,
  getFriends,
  updateProfile,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/friends", protectRoute, getFriends);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
router.post("/addFriend/:id", protectRoute, addFriend);

export default router;
