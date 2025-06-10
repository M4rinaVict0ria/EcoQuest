// src/db/connection.js
import knex from 'knex';
import path from 'path';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve('src', 'db', 'database.sqlite') // o arquivo será criado aqui
  },
  useNullAsDefault: true
});

export default db;
