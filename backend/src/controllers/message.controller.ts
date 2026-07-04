import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../prisma/prisma";

export async function send(req: AuthRequest, res: Response) {
  try {
    const { content } = req.body;
    const { chatRoomId } = req.params;

    const chatRoom = await prisma.chatRoom.findUnique({
      where: { id: chatRoomId },
      include: { interest: true },
    });

    if (!chatRoom) {
      return res.status(404).json({
        success: false,
        message: "Chat room not found",
      });
    }

    if (chatRoom.interest.status !== "ACCEPTED") {
      return res.status(403).json({
        success: false,
        message: "Chat is allowed only after interest is accepted.",
      });
    }

    const message = await prisma.message.create({
      data: {
        chatRoomId,
        senderId: req.user!.id,
        content,
      },
    });

    res.status(201).json({
      success: true,
      message,
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
    const { chatRoomId } = req.params;

    const messages = await prisma.message.findMany({
      where: { chatRoomId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json({
      success: true,
      messages,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}