const express = require('express');
const morgan = require('morgan');
const dbRouter = require('./routes/dbEndpoints');
const userRouter = require('./routes/userEndpoints');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require("./knexConfig");


app.use(morgan());
app.use(express.json());
app.use(cors({
  "origin": "http://localhost:9000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true,
}))
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(4444, () => {
  console.log('Your backend is listening on port 4444');
});

app.use(dbRouter);

app.use(userRouter);