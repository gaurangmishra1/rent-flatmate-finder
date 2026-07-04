import prisma from "../prisma/prisma";

export async function sendMessage(
  senderId: string,
  chatRoomId: string,
  content: string
) {
  const room = await prisma.chatRoom.findUnique({
    where: {
      id: chatRoomId,
    },
  });

  if (!room) {
    throw new Error("Chat room not found");
  }

  return await prisma.message.create({
    data: {
      senderId,
      chatRoomId,
      content,
    },
  });
}

export async function getMessages(chatRoomId: string) {
  return await prisma.message.findMany({
    where: {
      chatRoomId,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}