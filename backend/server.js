const express = require('express');
const morgan = require('morgan');
const dbRouter = require('./routes/dbEndpoints');

const app = express();

const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require("./knexConfig");

app.use(cors({
  "origin": process.env.NODE_ENV==="production"?"https://ouata-frontend.vercel.app": ['http://localhost:9000', 'http://127.0.0.1:9000'],
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true,
}))
app.use(morgan());
app.use(express.json());


app.use(bodyParser.json());

app.listen(4444, () => {
  console.log('Your backend is listening on port 4444');
});

app.use(dbRouter);

