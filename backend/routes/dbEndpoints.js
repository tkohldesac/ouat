const express = require("express");
const router = express.Router();
const knex = require("../knexConfig");

// GET ROUTES

router.get('/get-people', async (_,res) => {
    const response = await knex('ouata_people')
    .select('ouata_people.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(response)
})

router.get('/get-person/:personId', async (req,res) => {
  personId = req.params.personId

  console.log('route personId', personId)

  const response = await knex('ouata_people')
  .select('ouata_people.*')
  .where({ id: personId })
  .first();
  
  res.status(200)
  res.json(response)
})

router.get('/get-places', async (_,res) => {
    const response = await knex('ouata_places')
    .select('ouata_places.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(response)
})

router.get('/get-place/:placeId', async (req,res) => {
  placeId = req.params.placeId

  const response = await knex('ouata_places')
  .select('ouata_places.*')
  .where({ id: placeId })
  .first();
  
  console.log(response)
  res.status(200)
  res.json(response)
})

router.get('/get-things', async (_,res) => {
    const response = await knex('ouata_things')
    .select('ouata_things.*')
    .orderBy('id', 'desc')
    res.status(200)
    res.json(response)
})

router.get('/get-thing/:thingId', async (req,res) => {
  thingId = req.params.thingId

  const response = await knex('ouata_things')
  .select('ouata_things.*')
  .where({ id: thingId })
  .first();
  
  console.log(response)
  res.status(200)
  res.json(response)
})

router.get('/get-adventure', async (req,res) => {
  const adventureId = req.query.id

  try {
    const adventure = await knex('ouata_adventures')
      .select('ouata_adventures.*')
      .where({
        id: adventureId
      })
      .first();

    if (!adventure) {
      return res.status(404).json({error: `Adventure not found`});
    }
    
    const people = await knex('ouata_adventure_people')
    .where({adventure_id: adventureId})
    const places = await knex('ouata_adventure_places')
    .where({adventure_id: adventureId});
    const things = await knex('ouata_adventure_things')
    .where({adventure_id: adventureId});

    const peopleData = await knex('ouata_people').whereIn('id', people.map(p => p.person_id));
    
    const placesData = await knex('ouata_places').whereIn('id', places.map(p => p.place_id));
    
    const thingsData = await knex('ouata_things').whereIn('id', things.map(t => t.thing_id));
    
    
    const response = {
      adventure,
      peopleData: peopleData,
      placesData: placesData,
      thingsData: thingsData,
    };
    console.log(response);
    res.json(response);

  } catch (error) {
    console.error('Error getting adventure:', error);
    res.sendStatus(500);
  }
});

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

router.post('/create-place', async (req, res) => {

    placeName = req.body.placeName
    placeDescription = req.body.placeDescription
    placeSovereign = req.body.placeSovereign
    placeImageUrl = req.body.placeImageUrl
            
    try {
        const newPlace = await knex('ouata_places').insert({
            place_name: placeName,
            physical_description: placeDescription,
            sovereign: placeSovereign,
            img_url: placeImageUrl

        });
        res.sendStatus(200);
    } catch (error) {
        console.error('Error creating new place:', error);
        res.sendStatus(500);
    }
});

router.post('/create-thing', async (req, res) => {

    thingName = req.body.thingName
    thingDescription = req.body.thingDescription
    thingProperties = req.body.thingProperties
    thingImageUrl = req.body.thingImageUrl
            
    try {
        const newThing = await knex('ouata_things').insert({
            thing_name: thingName,
            physical_description: thingDescription,
            special_properties: thingProperties,
            img_url: thingImageUrl

        });
        res.sendStatus(200);
    } catch (error) {
        console.error('Error creating new place:', error);
        res.sendStatus(500);
    }
});

router.post('/create-adventure', async (req, res) => {
    const adventureTitle = req.body.adventureTitle;
    const adventureText = req.body.adventureText;
  
    const includedPeopleIds = req.body.includedPeople.map(person => person.id);
    const includedPlacesIds = req.body.includedPlaces.map(place => place.id);
    const includedThingsIds = req.body.includedThings.map(thing => thing.id);
  
    try {
      await knex.transaction(async (trx) => {
        
        const [newAdventure] = await trx('ouata_adventures').insert({
            adventure_title: adventureTitle,
            adventure_text: adventureText,
          }).returning('id');
          const newAdventureId = newAdventure.id;          

        await Promise.all(includedPeopleIds.map(personId =>
          trx('ouata_adventure_people').insert({
            adventure_id: newAdventureId,
            person_id: personId,
          })
        ));
  
        await Promise.all(includedPlacesIds.map(placeId =>
          trx('ouata_adventure_places').insert({
            adventure_id: newAdventureId,
            place_id: placeId,
          })
        ));
  
        await Promise.all(includedThingsIds.map(thingId =>
            trx('ouata_adventure_things').insert({
              adventure_id: newAdventureId,
              thing_id: thingId,
            })
          ));
      });
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error creating new adventure:', error);
      res.sendStatus(500);
    }
});
  
  

// PUT ROUTES
router.put('/update-adventure', async (req, res) => {
  const adventureId = req.body.adventureId;
  const adventureTitle = req.body.adventureTitle;
  const adventureText = req.body.adventureText;

  const includedPeopleIds = req.body.includedPeople.map(person => person.id);
  const includedPlacesIds = req.body.includedPlaces.map(place => place.id);
  const includedThingsIds = req.body.includedThings.map(thing => thing.id);

  try {
    console.log('1')
    await knex.transaction(async (trx) => {
      console.log('2')
      await trx('ouata_adventures')
        .where({ id: adventureId }) 
        .update({
          adventure_title: adventureTitle,
          adventure_text: adventureText,
        });
        console.log('3')
      await trx('ouata_adventure_people').where({ adventure_id: adventureId }).del();
      await trx('ouata_adventure_places').where({ adventure_id: adventureId }).del();
      await trx('ouata_adventure_things').where({ adventure_id: adventureId }).del();
      console.log('4')
      await Promise.all(
        includedPeopleIds.map((personId) =>
          trx('ouata_adventure_people').insert({
            adventure_id: adventureId,
            person_id: personId,
          })
        )
      );
      console.log('5')
      await Promise.all(
        includedPlacesIds.map((placeId) =>
          trx('ouata_adventure_places').insert({
            adventure_id: adventureId,
            place_id: placeId,
          })
        )
      );
      console.log('6')
      await Promise.all(
        includedThingsIds.map((thingId) =>
          trx('ouata_adventure_things').insert({
            adventure_id: adventureId,
            thing_id: thingId,
          })
        )
      );
    });
  } catch (error) {
    console.error('Error updating adventure:', error);
    res.sendStatus(500);
  }

  res.sendStatus(200);
});

router.put('/update-person', async (req, res) => {
  personId = req.body.personId
  personName = req.body.personName
  personAge = req.body.personAge
  personDescription = req.body.personDescription
  personAbilities = req.body.personAbilities
  personBio = req.body.personBio
  personImageUrl = req.body.personImageUrl

try {
  await knex.transaction(async (trx) => {
    
    await trx('ouata_people')
    .where({ id: personId })
    .update({
      person_name: personName,
      age: personAge,
      physical_description: personDescription,
      spells_abilities: personAbilities,
      bio: personBio,
      image_url: personImageUrl
    });
  });
  res.sendStatus(200);

} catch (error) {
  console.error('Error updating person:', error);
  res.sendStatus(500);
}
});

router.put('/update-place', async (req, res) => {
  placeId = req.body.placeId
  placeName = req.body.placeName
  placeDescription = req.body.placeDescription
  placeSovereign = req.body.placeSovereign
  placeImageUrl = req.body.placeImageUrl

try {
  await knex.transaction(async (trx) => {
    
    await trx('ouata_places')
    .where({ id: placeId })
    .update({
      place_name: placeName,
      physical_description: placeDescription,
      sovereign: placeSovereign,
      img_url: placeImageUrl
    });
  });
  res.sendStatus(200);

} catch (error) {
  console.error('Error updating place:', error);
  res.sendStatus(500);
}
});

router.put('/update-thing', async (req, res) => {
  thingId = req.body.thingId
  thingName = req.body.thingName
  thingDescription = req.body.thingDescription
  thingProperties = req.body.thingProperties
  thingImageUrl = req.body.thingImageUrl

try {
  await knex.transaction(async (trx) => {
    
    await trx('ouata_things')
    .where({ id: thingId })
    .update({
      thing_name: thingName,
      physical_description: thingDescription,
      special_properties: thingProperties,
      img_url: thingImageUrl
    });
  });
  res.sendStatus(200);
  
} catch (error) {
  console.error('Error updating thing:', error);
  res.sendStatus(500);
}
});

// DELETE ROUTES

router.delete('/delete-person', async (req, res) => {
  const personId = req.body.id
  try {
    await knex.transaction(async (trx) => {
      
      const deletePerson = await trx('ouata_people')
        .where({
          id: personId
        })
        .del();
        
    });

    res.sendStatus(200);
    
  } catch (error) {
    console.error('Error deleting person:', error);
    res.sendStatus(500);
  }
});

router.delete('/delete-place', async (req, res) => {
  const placeId = req.body.id
  try {
    await knex.transaction(async (trx) => {
      
      const deletePlace = await trx('ouata_places')
        .where({
          id: placeId
        })
        .del();
        
    });

    res.sendStatus(200);
    
  } catch (error) {
    console.error('Error deleting place:', error);
    res.sendStatus(500);
  }
});

router.delete('/delete-thing', async (req, res) => {
  const thingId = req.body.id
  try {
    await knex.transaction(async (trx) => {
      
      const deleteThing = await trx('ouata_things')
        .where({
          id: thingId
        })
        .del();
        
    });

    res.sendStatus(200);
    
  } catch (error) {
    console.error('Error deleting thing:', error);
    res.sendStatus(500);
  }
});

router.delete('/delete-adventure', async (req, res) => {
  const adventureId = req.body.id
  try {
    await knex.transaction(async (trx) => {
      
      const deleteAdventure = await trx('ouata_adventures')
        .where({
          id: adventureId
        })
        .del();
      const deleteAdventurePeople = await trx('ouata_adventure_people')
      .where({
        adventure_id: adventureId
      })
      .del();
      const deleteAdventurePlaces = await trx('ouata_adventure_places')
      .where({
        adventure_id: adventureId
      })
      .del();
      const deleteAdventureThings = await trx('ouata_adventure_things')
      .where({
        adventure_id: adventureId
      })
      .del();
    });

    res.sendStatus(200);
    
  } catch (error) {
    console.error('Error creating new adventure:', error);
    res.sendStatus(500);
  }
});


module.exports = router;
