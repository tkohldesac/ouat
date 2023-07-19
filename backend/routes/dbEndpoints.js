const express = require("express");
const router = express.Router();
const knex = require("../knexConfig");

// GET ROUTES
// GET PEOPLE
router.get('/get-people', async (_,res) => {
    const response = await knex('ouata_people')
    .select('ouata_people.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(response)
})
// GET PLACES
router.get('/get-places', async (_,res) => {
    const response = await knex('ouata_places')
    .select('ouata_places.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(response)
})
// GET THINGS:
router.get('/get-things', async (_,res) => {
    const response = await knex('ouata_things')
    .select('ouata_things.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(response)
})
//GET ADVENTURES
router.get('/get-adventures', async (_,res) => {
    const response = await knex('ouata_adventures')
    .select('ouata_adventures.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(response)
})
// POST ROUTES

router.post('/create-people', async (req, res) => {
    
    personName = req.body.personName
    personAge = req.body.personAge
    personDescription = req.body.personDescription
    personAbilities = req.body.personAbilities
    personBio = req.body.personBio
    personImageUrl = req.body.personImageUrl
    
try {
    const newPerson = await knex('ouata_people').insert({
        person_name: personName,
        age: personAge,
        physical_description: personDescription,
        spells_abilities: personAbilities,
        bio: personBio,
        image_url: personImageUrl
    });
    res.sendStatus(200);

} catch (error) {
    console.error('Error creating new person:', error);
    res.sendStatus(500);
}
});
// PUT ROUTES

// DELETE ROUTES

module.exports = router;
