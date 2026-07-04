import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createTenantProfile,
  getTenantProfile,
} from "../services/tenant.service";

export async function createProfile(req: AuthRequest, res: Response) {
  try {
    const profile = await createTenantProfile(req.user!.id, {
      preferredLocation: req.body.preferredLocation,
      budgetMin: req.body.budgetMin,
      budgetMax: req.body.budgetMax,
      moveInDate: new Date(req.body.moveInDate),
    });

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getProfile(req: AuthRequest, res: Response) {
  try {
    const profile = await getTenantProfile(req.user!.id);

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}