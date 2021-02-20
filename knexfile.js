// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'homework_4',
      username: 'veronica',
      password: '1234'
    }
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};
