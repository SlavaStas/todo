import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Todo } from "../entities/Todo";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // url: process.env.DATABASE_URL,
  database: process.env.DB_NAME,
  entities: [User, Todo],
  migrations: ["../migrations/*.ts"],
  synchronize: false,
  logging: true,
});
