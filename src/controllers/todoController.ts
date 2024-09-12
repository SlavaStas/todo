import { Request, Response } from "express";
import { Todo } from "../entities/Todo";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { TodoService } from "../services/todoService";

export const getTodos = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const todoRepository = AppDataSource.getRepository(Todo);
  const todos = await todoRepository.find({ where: { user: { id: userId } } });
  return res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { title, description, dueDate, location, city } = req.body;

  const newTodo = await TodoService.createTodo({ title, description, dueDate, location, city }, userId);
  if (!newTodo) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(201).json(newTodo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const { title, description, dueDate, location, city } = req.body;

  const updatedTodo = TodoService.updateTodo({
    id: Number(id),
    title,
    description,
    dueDate,
    location,
    city,
  }, userId);

  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  return res.json(updatedTodo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;

  const result: string | null = await TodoService.deleteTodo(Number(id), userId);

  if (!result) {
    return res.status(404).json({ message: "Todo not found" });
  }

  return res.json({ message: result });
};
