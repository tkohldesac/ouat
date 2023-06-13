const client = require("knex")({
  client: "pg",
  connection: {
  // user: 'postgres',
  // password: 'postgres',
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'ouata'
  }
});

module.exports = client;


// CHECK HERE FOR 'USER TOPH DOESN'T EXIST'