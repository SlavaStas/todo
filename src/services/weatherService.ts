import axios from "axios";

export class WeatherService {
  static async getWeatherByCity(city: string): Promise<any> {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error("Unable to fetch weather data");
    }
  }
}
