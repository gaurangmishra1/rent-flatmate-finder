import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { createListing, getAllListings } from "../services/listing.service";

export async function create(req: AuthRequest, res: Response) {
  try {
    const ownerId = req.user!.id;

    const listing = await createListing(ownerId, {
      location: req.body.location,
      rent: req.body.rent,
      availableFrom: new Date(req.body.availableFrom),
      roomType: req.body.roomType,
      furnished: req.body.furnished,
      photos: req.body.photos,
    });

    res.status(201).json({
      success: true,
      listing,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const listings = await getAllListings({
      location: req.query.location as string,
      minRent: req.query.minRent
        ? Number(req.query.minRent)
        : undefined,
      maxRent: req.query.maxRent
        ? Number(req.query.maxRent)
        : undefined,
    });

    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}