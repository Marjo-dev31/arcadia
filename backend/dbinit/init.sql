CREATE DATABASE IF NOT EXISTS arcadiadb;
-- if arcadiabd exists and you don't  want use it, change the name or delete with DROP DATABASE IF EXISTS arcadiadb; 

USE arcadiadb;

CREATE TABLE habitats (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    comment VARCHAR(500) DEFAULT NULL
);

CREATE TABLE breeds (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE animals (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    firstname VARCHAR(50) NOT NULL UNIQUE,
    id_habitat VARCHAR(36),
    id_breed VARCHAR(36),
    FOREIGN KEY (id_habitat) REFERENCES habitats(id) ON DELETE CASCADE,
    FOREIGN KEY (id_breed) REFERENCES breeds(id) ON DELETE CASCADE
);

CREATE TABLE services (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL
);

CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_role VARCHAR(36),
    FOREIGN KEY (id_role) REFERENCES roles(id) ON DELETE SET NULL
);

- CREATE TABLE reports (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    food VARCHAR(255) NOT NULL,
    grammage INT NOT NULL,
    date DATETIME NOT NULL,
    health VARCHAR(50) DEFAULT NULL,
    details_condition VARCHAR(255) DEFAULT NULL,
    id_user VARCHAR(36),
    id_animal VARCHAR(36),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (id_animal) REFERENCES animals(id) ON DELETE SET NULL
);

CREATE TABLE images (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    image_url VARCHAR(255) NOT NULL,
    id_animal VARCHAR(36)  NULL,
    id_habitat VARCHAR(36)  NULL,
    id_service VARCHAR(36) NULL,
    FOREIGN KEY (id_animal) REFERENCES animals(id) ON DELETE CASCADE,
    FOREIGN KEY (id_habitat) REFERENCES habitats(id) ON DELETE CASCADE,
    FOREIGN KEY (id_service) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    pseudo VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    status BOOLEAN NOT NULL,
    id_employee VARCHAR(36) NULL,
    FOREIGN KEY (id_employee) REFERENCES users(id) ON DELETE SET NULL
);

ALTER TABLE images 
    ADD createdAt DATE;

INSERT INTO habitats VALUES 
(DEFAULT, 'La Savane', "Lieu aride, typique des régions chaudes africaines. Elle est dominée par les plantes herbacées et est parsemée d'arbres. Malgré un climat tropical la faune y est riche.", DEFAULT),
(DEFAULT, 'La Jungle', "Avec sa forêt tropicale, forêt dense à la végétation verte et luxuriante, son fort taux d'humidité et sa biodiversité, découvrez la nature à l'état sauvage ", DEFAULT),
(DEFAULT, 'Les Marais', "Les marais, zone humide par excellence, sont composés d'une couche d'eau stagnante, peu profonde et envahie par la végétation aquatique. Ces conditons permettent d'accueillir une faune très diversifiée", DEFAULT);


INSERT INTO breeds VALUES
(DEFAULT, 'Lion'),
(DEFAULT, 'Tigre'),
(DEFAULT, 'Grand Koudou'),
(DEFAULT, 'Paresseux'),
(DEFAULT, 'Toucan'),
(DEFAULT, 'Chimpanzé'),
(DEFAULT, "Loutre d'Europe"),
(DEFAULT, 'Caimen à Lunette'),
(DEFAULT, 'Rainette de White');

INSERT INTO services VALUES
(DEFAULT, 'Visite guidée avec Manu', "Manu vous propose ses services afins de vous faire découvrir plus en détails l'habitat de votre choix. IL vous expliquera la vie au sein de celui-ci et décryptera pour vous la faune et la flore. Pensez à vous positionner dès votre arrivée au parc, les places sont limitées. Service gratuit."),
(DEFAULT, 'Visite à bord du petit train', "A bord de notre petit train touristique faites le tour complet de la propriété. Tout au long du trajet vous découvrirez les différents habitats et au plus proche des animaux. Les réservations se font à l'accueil et un départ à lieu toutes les 45 minutes. Tarifs: 5€/adulte et 2€/enfant"),
(DEFAULT, 'Restauration', "Vous trouverez au sein du parc différents lieux de restauration. Faites une pause gourmande à la cahute aux crêpes, une halte aux snacks pour manger sur le pouce ou encore une coupure déjeuner au restaurant l'Arca-diner, qui se fera un plaisir de vous faire savourer une cuisine traditionnelle. Il y en a pour tous les budgets. A table!");

INSERT INTO roles VALUES
(DEFAULT, 'Admin'),
(DEFAULT, 'Vétérinaire'),
(DEFAULT, 'Employé');

INSERT INTO animals VALUES	(DEFAULT, 'Edward', (SELECT id FROM habitats WHERE title="La Savane"),(SELECT id FROM breeds WHERE name='Lion'));
INSERT INTO animals VALUES	(DEFAULT, 'Alphonse', (SELECT id FROM habitats WHERE title="La Jungle"),(SELECT id FROM breeds WHERE name='Toucan'));
INSERT INTO animals VALUES	(DEFAULT, 'Winry', (SELECT id FROM habitats WHERE title="Les Marais"),(SELECT id FROM breeds WHERE name='Rainette de White'));
INSERT INTO animals VALUES	(DEFAULT, 'Alphonse', (SELECT id FROM habitats WHERE title="La Jungle"),(SELECT id FROM breeds WHERE name='Toucan'));
INSERT INTO animals VALUES	(DEFAULT, 'Greed', (SELECT id FROM habitats WHERE title="La Jungle"),(SELECT id FROM breeds WHERE name='Chimpanzé'));
INSERT INTO animals VALUES	(DEFAULT, 'Maes', (SELECT id FROM habitats WHERE title="La Jungle"),(SELECT id FROM breeds WHERE name='Paresseux'));
INSERT INTO animals VALUES	(DEFAULT, 'Winry', (SELECT id FROM habitats WHERE title="Les Marais"),(SELECT id FROM breeds WHERE name='Rainette de White'));
INSERT INTO animals VALUES	(DEFAULT, 'Izumi', (SELECT id FROM habitats WHERE title="Les Marais"),(SELECT id FROM breeds WHERE name="loutre d'Europe"));
INSERT INTO animals VALUES	(DEFAULT, 'Pinako', (SELECT id FROM habitats WHERE title="Les Marais"),(SELECT id FROM breeds WHERE name='Caimen à Lunettes'));

INSERT INTO users VALUES (DEFAULT, 'José', 'Pasbové', 'josepasbove@arcadia.com', '$2b$10$pQBkrsu5.htIin8ao1xpvuHP48FP7VJQgEvnPkM2kyXteCLz62Mu2', (SELECT id FROM roles WHERE name = 'Admin'));

INSERT INTO images(id, image_url, id_service ) VALUES ( DEFAULT, 'sandwich.jpg', (SELECT id FROM services WHERE title='Restauration'));
INSERT INTO images(id, image_url, id_habitat ) VALUES ( DEFAULT, 'lasavane.jpg', (SELECT id FROM habitats WHERE title='La Savane'));
INSERT INTO images(id, image_url, id_animal ) VALUES ( DEFAULT, 'caimen.jpg', (SELECT id FROM animals WHERE firstname='Pinako'));