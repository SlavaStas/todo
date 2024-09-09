import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { AppDataSource } from '../config/database';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({ email, password: hashedPassword });
  await userRepository.save(user);

  return res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return res.json({ token });
};
