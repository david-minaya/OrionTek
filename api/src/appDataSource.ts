import { DataSource } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Address } from './entities/address.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: true,
  entities: [
    Customer,
    Address
  ]
});
