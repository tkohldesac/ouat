const express = require("express");
const router = express.Router();
const knex = require("../knexConfig");

// GET ROUTES
// GET PEOPLE
router.get('/get-people', async (req,res) => {
    const reply = await knex('ouata_people')
    .select('ouata_people.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(reply)
})
// GET PLACES
router.get('/get-places', async (_,res) => {
    const reply = await knex('ouata_places')
    .select('ouata_places.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(reply)
})
// GET THINGS:
router.get('/get-things', async (_,res) => {
    const reply = await knex('ouata_things')
    .select('ouata_things.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(reply)
})
//GET ADVENTURES
router.get('/get-adventures', async (_,res) => {
    const reply = await knex('ouata_adventures')
    .select('ouata_adventures.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(reply)
})
// POST ROUTES

// PUT ROUTES

// DELETE ROUTES

module.exports = router;
