import knex from 'knex';

const database = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './exe3.sqlite3',
  },
  useNullAsDefault: true,
});

export default database;