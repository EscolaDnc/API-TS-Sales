import 'reflect-metadata';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const port = Number(process.env.PORT) || undefined;

const baseDataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`./src/modules/**/infra/database/entities/*.{ts,js}`],
  migrations: [`./src/shared/infra/typeorm/migrations/*.{ts,js}`],
};

const testDatabaseName = process.env.DB_NAME_TEST || process.env.DB_NAME;

const appTestDataSourceOptions = {
  ...baseDataSourceOptions,
  database: testDatabaseName,
};

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? (appTestDataSourceOptions as DataSourceOptions)
    : (baseDataSourceOptions as DataSourceOptions),
);
