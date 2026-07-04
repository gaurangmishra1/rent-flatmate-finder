import { loginUser } from "../services/auth.service";
import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerUser(name, email, password, role);

    res.status(201).json({
  success: true,
  message: "User Registered Successfully",
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  },
});
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      ...result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}