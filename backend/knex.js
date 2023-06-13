const knex = require('knex');
const knexfile = require('./knexConfig');

const db = knex(knexfile.client);