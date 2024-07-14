import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const port = process.env.PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`./src/modules/**/infra/database/entities/*.{ts,js}`],
  migrations: [`./src/shared/infra/typeorm/migrations/*.{ts,js}`],
});
