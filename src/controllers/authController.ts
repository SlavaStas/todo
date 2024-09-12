import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/userService";
import bcrypt from "bcryptjs";


const userService = new UserService();

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await userService.getUserByEmail(email);
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userService.createNewUser(email, hashedPassword);

  return res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  return res.json({ token });
};
