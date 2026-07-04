import { Router } from "express";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.get(
  "/profile",
  authenticate,
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      message: "Protected Route",
      user: req.user,
    });
  }
);

router.get(
  "/owner",
  authenticate,
  authorize("OWNER"),
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      message: "Welcome Owner",
    });
  }
);

router.get(
  "/tenant",
  authenticate,
  authorize("TENANT"),
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      message: "Welcome Tenant",
    });
  }
);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

export default router;