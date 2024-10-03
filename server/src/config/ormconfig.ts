import { DataSource } from 'typeorm';

const source = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'sample',
  password: 'sample',
  database: 'sample',
  entities: [__dirname + '/entities/*.ts'],  
  migrations: [__dirname + '/migration/*.ts'], 
  synchronize: false,
});

export default source;
