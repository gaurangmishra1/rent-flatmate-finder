import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createInterest,
  getOwnerInterests,
  getTenantInterests,
  updateInterestStatus,
} from "../services/interest.service";

export async function expressInterest(
  req: AuthRequest,
  res: Response
) {
  try {
    const interest = await createInterest(
      req.user!.id,
      req.body.listingId
    );

    res.status(201).json({
      success: true,
      interest,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function ownerInterests(
  req: AuthRequest,
  res: Response
) {
  try {
    const interests = await getOwnerInterests(req.user!.id);

    res.status(200).json({
      success: true,
      interests,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
export async function tenantInterests(
  req: AuthRequest,
  res: Response
) {
  try {
    const interests = await getTenantInterests(req.user!.id);

    res.status(200).json({
      success: true,
      interests,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
export async function acceptInterest(
  req: AuthRequest,
  res: Response
) {
  try {
    const interest = await updateInterestStatus(
      req.params.id as string,
      "ACCEPTED"
    );

    res.status(200).json({
      success: true,
      message: "Interest accepted",
      interest,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function declineInterest(
  req: AuthRequest,
  res: Response
) {
  try {
    const interest = await updateInterestStatus(
      req.params.id as string,
      "DECLINED"
    );

    res.status(200).json({
      success: true,
      message: "Interest declined",
      interest,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}