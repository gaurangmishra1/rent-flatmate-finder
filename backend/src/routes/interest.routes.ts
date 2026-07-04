import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  expressInterest,
  ownerInterests,
  tenantInterests,
  acceptInterest,
  declineInterest,
} from "../controllers/interest.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("TENANT"),
  expressInterest
);

router.get(
  "/owner",
  authenticate,
  authorize("OWNER"),
  ownerInterests
);

router.get(
  "/my",
  authenticate,
  authorize("TENANT"),
  tenantInterests
);

router.patch(
  "/:id/accept",
  authenticate,
  authorize("OWNER"),
  acceptInterest
);

router.patch(
  "/:id/decline",
  authenticate,
  authorize("OWNER"),
  declineInterest
);

export default router;