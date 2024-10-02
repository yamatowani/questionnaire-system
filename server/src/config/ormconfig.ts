import { DataSource } from 'typeorm';

const source = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'sample',
  password: 'sample',
  database: 'sample',
  entities: ['src/entities/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  synchronize: false,
});

export default source;