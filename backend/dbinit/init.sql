CREATE DATABASE IF NOT EXISTS arcadiadb;
-- if arcadiabd exists, change the name or delete with DROP DATABASE IF EXISTS arcadiadb  

USE arcadiadb;

-- ici il faut creer les tables CREATE TABLE

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
    FOREIGN KEY (id_habitat) REFERENCES habitats(id),
    FOREIGN KEY (id_breed) REFERENCES breeds(id)
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
    FOREIGN KEY (id_role) REFERENCES roles(id)
);

CREATE TABLE employee_report (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    food VARCHAR(255) NOT NULL,
    grammage INT NOT NULL,
    date DATETIME NOT NULL,
    id_user VARCHAR(36) NOT NULL,
    id_animal VARCHAR(36) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_animal) REFERENCES animals(id)
);

CREATE TABLE veterinary_report (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    food VARCHAR(255) NOT NULL,
    grammage INT NOT NULL,
    date DATETIME NOT NULL,
    health VARCHAR(50) NOT NULL,
    details_condition VARCHAR(255) DEFAULT NULL,
    id_user VARCHAR(36) NOT NULL,
    id_animal VARCHAR(36) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_animal) REFERENCES animals(id)
);

CREATE TABLE images (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    image_url VARCHAR(255) NOT NULL,
    id_animal VARCHAR(36)  NULL,
    id_habitat VARCHAR(36)  NULL,
    id_service VARCHAR(36) NULL,
    FOREIGN KEY (id_animal) REFERENCES animals(id) DELETE ON CASCADE,
    FOREIGN KEY (id_habitat) REFERENCES habitats(id) DELETE ON CASCADE,
    FOREIGN KEY (id_service) REFERENCES services(id) DELETE ON CASCADE
);

CREATE TABLE reviews (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    pseudo VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    status BOOLEAN NOT NULL,
    id_employee VARCHAR(36) NOT NULL,
    FOREIGN KEY (id_employee) REFERENCES users(id) DELETE ON CASCADE
);

