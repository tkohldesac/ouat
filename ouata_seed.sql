
-- Create the people table
CREATE TABLE ouata_people (
    id SERIAL PRIMARY KEY,
    person_name VARCHAR(256),
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
    adventure_title VARCHAR(256),
    adventure_text TEXT,
    created_at TIMESTAMP
);

--Create adventure people join table

CREATE TABLE ouata_adventure_people (
    id SERIAL NOT NULL UNIQUE,
    adventure_id INT,
    person_id INT
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

-- Insert an example person
INSERT INTO ouata_people (person_name, age, physical_description, spells_abilities, bio, image_url)
VALUES ('Chicken Fry', 25, 'Tall and lean, with sun-kissed skin and long red hair flowing like her home''s red desert sands. She wears flowing desert robes adorned with intricate symbols.', 'Standard Desert Bruja Spells', 'Chicken Fry is a wise and mysterious desert bruja who harnesses the ancient powers of the arid lands. Living in the heart of the desert, she draws her strength from the scorching sun and shifting sands. Her spells are deeply entwined with the elements of the desert.', 'img_url'),
('Joey-Goey', 2, 'Short and energetic, with long blond hair and adorned with nature-themed jewelry', 'Nature Shaper', 'Joella-Michella-Bella is a nature shaper who draws power from the natural world. She can manipulate plant life, causing vines to entangle enemies, summoning gusts of wind, and even healing wounds using the essence of nature. She''s deeply connected to the environment and seeks to preserve its balance.', 'N/A'),
('Real Booty', 3, 'Real Booty is a lithe and agile figure, with deep grey eyes that reflect her connection to the forest. She wears earth-toned clothing and a cloak made from leaves and moss, blending seamlessly into her natural surroundings.', 'Fairy Familiar - Abby Cadabby', 'Real Booty is a skilled and perceptive forest ranger, attuned to the heartbeat of the wilderness. She roams the woods, protecting its inhabitants and maintaining the delicate balance of nature.', 'N/A'),
('Captain Daddy', 2032, 'Captain is an elderly and graceful wizard with a silver, cascading beard. He wears a long robe adorned with arcane symbols of healing magic.  ', 'Healing Spells', 'Captain Daddy is a wise and compassionate healer who has dedicated his life to the study of restorative magic. He travels the lands, offering aid to those in need and mending the wounds of both friend and stranger.', 'N/A');

-- Insert an example place
INSERT INTO ouata_places (place_name, physical_description, sovereign, img_url)
VALUES ('Castle Kohldesac', 'The castle stands proudly atop a rugged hill, its massive stone walls soaring high into the sky. Surrounded by a deep moat fed by a meandering river, the fortress exudes an air of grandeur and strength. Four imposing towers flank the corners of the castle, reaching even higher than the walls, each crowned with elegant crenellations.', 'Lord Topherion', 'img_url'),
('D''park', 'A territory filled with trees and exercise equipment.', 'None', 'img_url'),
('Pony Playhouse', 'I don''t know, I just need more places to adjust some stuff. I need a scroll bar to pop up so I''m writing stuff. I could probably lorem ipsum it but meh, I''m just gonna keep a stream of consciousness going for a couple seconds and then ctrl+c/ctrl+v it. Behold:¶¶I don''t know, I just need more places to adjust some stuff. I need a scroll bar to pop up so I''m writing stuff. I could probably lorem ipsum it but meh, I''m just gonna keep a stream of consciousness going for a couple seconds and then ctrl+c/ctrl+v it. Behold:¶¶I don''t know, I just need more places to adjust some stuff. I need a scroll bar to pop up so I''m writing stuff. I could probably lorem ipsum it but meh, I''m just gonna keep a stream of consciousness going for a couple seconds and then ctrl+c/ctrl+v it.', 'Me', 'img_url');

-- Insert an example thing
INSERT INTO ouata_things (thing_name, physical_description, special_properties, img_url)
VALUES ('Hood of Goah', 'Bright white and silver, this hood has a shining horn that gleams in the sunlight.', 'Wearing this hood transforms the wearer into the mythical Unicorn.', 'N/A'),('Frozen Bow', 'A deep purple bow and quiver, engraved in the image of 2 princesses.', 'Arrows shot from the Frozen Bow become enchanted with ice.', 'N/A'),
('Shoes For Walkin''', 'The perfect pair of shoes for walking any distance. A timeless family heirloom from a time when quality came first.', 'Will never wear out from overuse. Can be destroyed by other means. They look like red Converse.', 'N/A'),
('Wizard Robe & Hat', 'A dark, unkempt, ordinary robe.', 'This is no ordinary robe!', 'N/A');

-- Insert an example adventure
INSERT INTO ouata_adventures (adventure_title, adventure_text, created_at)
VALUES ('Adventure Zero', 'This is Adventure Zero. Nothing all that great is going on but there is now an adventure recorded. Everything should work as intended. I will be adding the family, the castle and the things the group is bringing with them below:', CURRENT_TIMESTAMP);

-- Insert an example adventure person
INSERT INTO ouata_adventure_people (adventure_id, person_id)
VALUES (1, 1);

-- Insert an example adventure places
INSERT INTO ouata_adventure_places (adventure_id, place_id)
VALUES (1, 1);

-- Insert an example adventure thing
INSERT INTO ouata_adventure_things (adventure_id, thing_id)
VALUES (1, 1);