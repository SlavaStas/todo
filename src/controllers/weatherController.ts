import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { WeatherService } from "../services/weatherService";
import { Todo } from "../entities/Todo";

export const getWeatherForTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;

  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = await todoRepository.findOneBy({ id: parseInt(todoId) });
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  try {
    const weatherData = await WeatherService.getWeatherByCity(todo.city);
    return res.json(weatherData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return res.status(500).json({ message: errorMessage });
  }
};
