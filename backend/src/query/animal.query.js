const QUERYANIMALS = {
    // SELECT_ANIMALS: 'SELECT animals.id, animals.firstname, animals.id_habitat, animals.id_breed, images.id AS image_id, images.image_url, habitats.title AS habitat, breeds.name AS breed FROM animals LEFT JOIN images ON images.id_animal = animals.id LEFT JOIN habitats ON habitats.id = animals.id_habitat LEFT JOIN breeds ON breeds.id = animals.id_breed',
    SELECT_ANIMALS: 'SELECT animals.id, animals.firstname FROM animals',
    SELECT_ANIMAL: 'SELECT * FROM animals WHERE id = ?',
    CREATE_ANIMAL: 'INSERT INTO animals VALUES (DEFAULT, ?, ?, ?)',
    UPDATE_ANIMAL: 'UPDATE animals SET firstname = ?, id_habitat = ?, id_breed = ? WHERE id = ?',
    DELETE_ANIMAL: 'DELETE FROM animals WHERE id = ?',
    SELECT_ANIMALS_HABITAT: 'SELECT animals.id, animals.firstname, images.image_url AS image_url, breeds.name AS breed, veterinary_reports.health AS health FROM animals LEFT JOIN (SELECT * FROM images LIMIT 1) as images ON images.id_animal = animals.id INNER JOIN habitats ON habitats.id = animals.id_habitat INNER JOIN breeds ON breeds.id = animals.id_breed LEFT JOIN veterinary_reports ON veterinary_reports.id_animal = animals.id WHERE habitats.id = ?'
}

export default QUERYANIMALS;