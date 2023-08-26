// Uncomment below when connecting to vercel:

console.log(process.env.NODE_ENV)
const client = require('knex')(process.env.NODE_ENV==="production"?{
  client: 'pg',
  connection: process.env.POSTGRES_URL + "?sslmode=require",
} : {
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