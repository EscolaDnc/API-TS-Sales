import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { AppDataSource } from '@shared/typeorm/data-source';
import ErrorHandlerMiddleware from '@shared/errors/ErrorHandlerMiddleware';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use(routes);
    app.use(ErrorHandlerMiddleware.handleError);

    console.log('Connected to the database! 🎉');

    return app.listen(3333, () => {
      console.log('Server started on port 3333! 🏆');
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
  });
