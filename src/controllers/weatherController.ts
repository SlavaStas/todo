import { Request, Response } from "express";
import axios from "axios";
import { Todo } from "../entities/Todo";
import { AppDataSource } from "../config/database";

const apiKey = process.env.OPENWEATHER_API_KEY;

export const getWeatherForTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;

  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = await todoRepository.findOne({ where: { id: Number(id), user: { id: userId } } });

  if (!todo || !todo.location) {
    return res.status(404).json({ message: "Todo not found or location is missing" });
  }

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${todo.location}&appid=${apiKey}&units=metric`,
    );

    const weatherData = weatherResponse.data;
    const weatherInfo = {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      city: weatherData.name,
    };

    return res.json(weatherInfo);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return res
      .status(500)
      .json({ message: "Error fetching weather data", error: errorMessage });
  }
};
