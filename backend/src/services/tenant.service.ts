import prisma from "../prisma/prisma";

export async function createTenantProfile(
  userId: string,
  data: {
    preferredLocation: string;
    budgetMin: number;
    budgetMax: number;
    moveInDate: Date;
  }
) {
  return await prisma.tenantProfile.upsert({
    where: {
      userId,
    },
    update: {
      ...data,
    },
    create: {
      userId,
      ...data,
    },
  });
}

export async function getTenantProfile(userId: string) {
  return await prisma.tenantProfile.findUnique({
    where: {
      userId,
    },
  });
}