import { Request, Response } from 'express';
import { Todo } from '../entities/Todo';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

export const getTodos = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const todoRepository = AppDataSource.getRepository(Todo);
  const todos = await todoRepository.find({ where: { user: { id: userId } } });
  return res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { title, description, dueDate, location } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = todoRepository.create({ title, description, dueDate, location, user });
  await todoRepository.save(todo);

  return res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const { title, description, dueDate, location } = req.body;

  const todoRepository = AppDataSource.getRepository(Todo);
  let todo = await todoRepository.findOne({ where: { id: Number(id), user: { id: userId } } });

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todo.title = title || todo.title;
  todo.description = description || todo.description;
  todo.dueDate = dueDate || todo.dueDate;
  todo.location = location || todo.location;

  await todoRepository.save(todo);
  return res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;

  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = await todoRepository.findOne({ where: { id: Number(id), user: { id: userId } } });

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  await todoRepository.remove(todo);
  return res.json({ message: 'Todo deleted successfully' });
};
