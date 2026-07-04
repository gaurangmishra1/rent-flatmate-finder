import prisma from "../prisma/prisma";

export async function createListing(
  ownerId: string,
  data: {
    location: string;
    rent: number;
    availableFrom: Date;
    roomType: string;
    furnished: boolean;
    photos: string[];
  }
) {
  const listing = await prisma.listing.create({
    data: {
      ownerId,
      ...data,
    },
  });

  return listing;
}

export async function getAllListings(filters: any = {}) {
  return await prisma.listing.findMany({
    where: {
      status: "AVAILABLE",

      ...(filters.location && {
        location: {
          contains: filters.location,
          mode: "insensitive",
        },
      }),

      ...(filters.minRent && {
        rent: {
          gte: filters.minRent,
        },
      }),

      ...(filters.maxRent && {
        rent: {
          ...(filters.minRent && {
            gte: filters.minRent,
          }),
          lte: filters.maxRent,
        },
      }),

      ...(filters.roomType && {
        roomType: filters.roomType,
      }),

      ...(filters.furnished !== undefined && {
        furnished: filters.furnished,
      }),
    },

    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}