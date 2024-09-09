import express from 'express';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import weatherRoutes from './routes/weatherRoutes';
import { AppDataSource } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json());

    app.use('/api', authRoutes);
    app.use('/api', todoRoutes);
    app.use('/api', weatherRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((error) => console.log('Error during Data Source initialization:', error));
