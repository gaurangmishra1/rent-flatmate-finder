import prisma from "../prisma/prisma";

function calculateCompatibility(
  tenant: any,
  listing: any
) {
  let score = 0;
  const reasons: string[] = [];

  if (
    tenant.preferredLocation &&
    listing.location
      .toLowerCase()
      .includes(tenant.preferredLocation.toLowerCase())
  ) {
    score += 40;
    reasons.push("Preferred location matches.");
  }

  if (
    listing.rent >= tenant.budgetMin &&
    listing.rent <= tenant.budgetMax
  ) {
    score += 40;
    reasons.push("Rent fits tenant budget.");
  }

  if (
    new Date(listing.availableFrom) <=
    new Date(tenant.moveInDate)
  ) {
    score += 20;
    reasons.push("Move-in dates are compatible.");
  }

  return {
    score,
    explanation:
      reasons.length > 0
        ? reasons.join(" ")
        : "Low compatibility.",
  };
}

export async function createInterest(
  tenantId: string,
  listingId: string
) {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  if (!listing) {
    throw new Error("Listing not found");
  }

  const tenant = await prisma.tenantProfile.findUnique({
    where: {
      userId: tenantId,
    },
  });

  if (!tenant) {
    throw new Error("Tenant profile not found");
  }

  const existing = await prisma.interest.findFirst({
    where: {
      tenantId,
      listingId,
    },
  });

  if (existing) {
    throw new Error("Interest already exists");
  }

  const result = calculateCompatibility(
    tenant,
    listing
  );

  return await prisma.interest.create({
    data: {
      tenantId,
      listingId,
      compatibilityScore: result.score,
      compatibilityExplanation: result.explanation,
    },
  });
}

export async function getOwnerInterests(ownerId: string) {
  return await prisma.interest.findMany({
    where: {
      listing: {
        ownerId,
      },
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      listing: {
        select: {
          id: true,
          location: true,
          rent: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function getTenantInterests(tenantId: string) {
  return await prisma.interest.findMany({
    where: {
      tenantId,
    },
    include: {
      listing: {
        select: {
          id: true,
          location: true,
          rent: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function updateInterestStatus(
  interestId: string,
  status: "ACCEPTED" | "DECLINED"
) {
  const interest = await prisma.interest.update({
    where: { id: interestId },
    data: { status },
  });

  if (status === "ACCEPTED") {
    await prisma.chatRoom.upsert({
      where: {
        interestId: interestId,
      },
      update: {},
      create: {
        interestId,
      },
    });

    await prisma.listing.update({
      where: {
        id: interest.listingId,
      },
      data: {
        status: "FILLED",
      },
    });
  }

  return interest;
}