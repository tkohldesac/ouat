const express = require("express");
const router = express.Router();
const knex = require("../knexConfig");

// GET ROUTES
router.get('/', async (_,res) => {
    const reply = await knex('ouata_things')
    .select('ouata_things.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(reply)
})
// POST ROUTES

// PUT ROUTES

// DELETE ROUTES

module.exports = router;
