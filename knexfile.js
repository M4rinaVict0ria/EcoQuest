import path from 'path';

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve('db', 'dev.sqlite3') // <- fora do src
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve('db', 'migrations') // <- fora do src
    }
  }
};
