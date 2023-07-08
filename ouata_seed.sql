
-- Create the characters table
CREATE TABLE ouata_characters (
    id SERIAL PRIMARY KEY,
    character_name VARCHAR(256),
    age INT,
    physical_description TEXT,
    spells_abilities TEXT,
    bio TEXT,
    image_url TEXT
);

-- Create the places table
CREATE TABLE ouata_places (
    id SERIAL NOT NULL UNIQUE,
    place_name VARCHAR(256),
    physical_description TEXT,
    sovereign TEXT,
    img_url TEXT
);

-- Create the things table
CREATE TABLE ouata_things (
    id SERIAL NOT NULL UNIQUE,
    thing_name VARCHAR(256),
    physical_description TEXT,
    special_properties TEXT,
    img_url TEXT
);

-- Create adventures table
CREATE TABLE ouata_adventures (
    id SERIAL NOT NULL UNIQUE,
    entry_title VARCHAR(256),
    entry_text TEXT,
    created_at TIMESTAMP
);

--Create adventure characters join table

CREATE TABLE ouata_adventure_characters (
    id SERIAL NOT NULL UNIQUE,
    adventure_id INT,
    character_id INT
);

--Create adventure places join table

CREATE TABLE ouata_adventure_places (
    id SERIAL NOT NULL UNIQUE,
    adventure_id INT,
    place_id INT
);

--Create adventure things join table

CREATE TABLE ouata_adventure_things (
    id SERIAL NOT NULL UNIQUE,
    adventure_id INT,
    thing_id INT
);

-- Insert an example character
INSERT INTO ouata_characters (character_name, age, physical_description, spells_abilities, bio, image_url)
VALUES ('Chicken Fry', 29, 'Purdy', 'Bruja magic spell 1, Bruja magic spell 2', 'Queen of all the land', 'img_url');

-- Insert an example place
INSERT INTO ouata_places (place_name, physical_description, sovereign, img_url)
VALUES ('Angela''s Castle', 'Big and full of rainbows and animals and friends', 'Angela', 'img_url');

-- Insert an example thing
INSERT INTO ouata_things (thing_name, physical_description, special_properties, img_url)
VALUES ('Hood of Goah', 'White hood resembling a mythic creature', 'Allows one to take the shape of a winged unicorn', 'img_url');

-- Insert an example adventure
INSERT INTO ouata_adventures (entry_title, entry_text, created_at)
VALUES ('Once Upon A Time Ago', 'Some stuff happened. It involved some people. And they all lived happily ever after.', CURRENT_TIMESTAMP);

-- Insert an example adventure character
INSERT INTO ouata_adventure_characters (adventure_id, character_id)
VALUES (1, 1);

-- Insert an example adventure places
INSERT INTO ouata_adventure_places (adventure_id, place_id)
VALUES (1, 1);

-- Insert an example adventure thing
INSERT INTO ouata_adventure_things (adventure_id, thing_id)
VALUES (1, 1);