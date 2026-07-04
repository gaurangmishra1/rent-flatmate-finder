import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createProfile,
  getProfile,
} from "../controllers/tenant.controller";

console.log("Tenant routes loaded");

const router = Router();

router.post(
  "/profile",
  authenticate,
  authorize("TENANT"),
  createProfile
);

router.get(
  "/profile",
  authenticate,
  authorize("TENANT"),
  getProfile
);

export default router;
