import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

console.log(__dirname);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // url: process.env.DATABASE_URL,
  database: process.env.DB_NAME,
  entities: [__dirname + '/entities/*.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
