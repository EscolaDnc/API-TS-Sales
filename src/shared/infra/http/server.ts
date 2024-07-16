import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import ErrorHandlerMiddleware from '@shared/errors/ErrorHandlerMiddleware';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';
import '@shared/container';

const startServer = async () => {
  await AppDataSource.initialize();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(rateLimiter);
  app.use('/files', express.static(uploadConfig.directory));
  app.use(routes);
  app.use(errors());
  app.use(ErrorHandlerMiddleware.handleError);

  console.log('Connected to the database! 🎉');

  return app;
};

export default startServer()
  .then(app => {
    return app.listen(3333, () => {
      console.log('Server started on port 3333! 🏆');
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
  });
