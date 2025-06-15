import knex from 'knex';
import path from 'path';

const environment = process.env.NODE_ENV || 'development';

// Corrigido: aponta para o mesmo local usado no knexfile.js
const dbFilePath = path.resolve('db', 'dev.sqlite3');

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: dbFilePath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve('db', 'migrations'), // corrigido também
    },
  },
};

const db = knex(config[environment]);

export default db;
