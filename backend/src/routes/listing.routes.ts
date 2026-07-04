import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { create, getAll } from "../controllers/listing.controller";
const router = Router();
router.get("/", getAll);
router.post(
  "/",
  authenticate,
  authorize("OWNER"),
  create
);

export default router;