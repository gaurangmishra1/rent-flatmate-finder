import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  getOwnerDashboard,
  getTenantDashboard,
} from "../services/dashboard.service";

export async function ownerDashboard(
  req: AuthRequest,
  res: Response
) {
  try {
    const dashboard = await getOwnerDashboard(req.user!.id);

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function tenantDashboard(
  req: AuthRequest,
  res: Response
) {
  try {
    const dashboard = await getTenantDashboard(req.user!.id);

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}