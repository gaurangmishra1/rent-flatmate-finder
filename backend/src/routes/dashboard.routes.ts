import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  ownerDashboard,
  tenantDashboard,
} from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/owner",
  authenticate,
  authorize("OWNER"),
  ownerDashboard
);

router.get(
  "/tenant",
  authenticate,
  authorize("TENANT"),
  tenantDashboard
);

export default router;