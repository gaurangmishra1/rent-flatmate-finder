import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  send,
  getAll,
} from "../controllers/message.controller";

const router = Router();

router.post(
  "/:chatRoomId",
  authenticate,
  send
);

router.get(
  "/:chatRoomId",
  authenticate,
  getAll
);

export default router;