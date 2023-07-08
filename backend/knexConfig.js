const client = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_URL + "?sslmode=require",
});

module.exports = client;