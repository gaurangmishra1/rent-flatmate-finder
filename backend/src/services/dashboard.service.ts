import prisma from "../prisma/prisma";

export async function getOwnerDashboard(ownerId: string) {
  const totalListings = await prisma.listing.count({
    where: {
      ownerId,
    },
  });

  const availableListings = await prisma.listing.count({
    where: {
      ownerId,
      status: "AVAILABLE",
    },
  });

  const pendingInterests = await prisma.interest.count({
    where: {
      status: "PENDING",
      listing: {
        ownerId,
      },
    },
  });

  const acceptedInterests = await prisma.interest.count({
    where: {
      status: "ACCEPTED",
      listing: {
        ownerId,
      },
    },
  });

  const declinedInterests = await prisma.interest.count({
    where: {
      status: "DECLINED",
      listing: {
        ownerId,
      },
    },
  });

  return {
    totalListings,
    availableListings,
    pendingInterests,
    acceptedInterests,
    declinedInterests,
  };
}

export async function getTenantDashboard(tenantId: string) {
  const interestsSent = await prisma.interest.count({
    where: {
      tenantId,
    },
  });

  const pending = await prisma.interest.count({
    where: {
      tenantId,
      status: "PENDING",
    },
  });

  const accepted = await prisma.interest.count({
    where: {
      tenantId,
      status: "ACCEPTED",
    },
  });

  const declined = await prisma.interest.count({
    where: {
      tenantId,
      status: "DECLINED",
    },
  });

  return {
    interestsSent,
    pending,
    accepted,
    declined,
  };
}