const QUERYANIMALS = {
    SELECT_ANIMALS: 'SELECT animals.id, animals.firstname, animals.id_habitat, animals.id_breed, images.id AS image_id, images.image_url, habitats.title, breeds.name FROM animals LEFT JOIN images ON images.id_animal = animals.id LEFT JOIN habitats ON habitats.id = animals.id_habitat LEFT JOIN breeds ON breeds.id = animals.id_breed',
    CREATE_ANIMAL: 'INSERT INTO animals VALUES (DEFAULT, ?, ?, ?)'
}

export default QUERYANIMALS;