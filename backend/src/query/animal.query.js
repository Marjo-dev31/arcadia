const QUERYANIMALS = {
    SELECT_ANIMALS: 'SELECT * FROM animals LEFT JOIN breeds ON breeds.id = id_breed LEFT JOIN habitats ON habitats.id = id_habitat LEFT JOIN images ON animals.id = images.id_animal',
    CREATE_ANIMAL: 'INSERT INTO animals VALUES (DEFAULT, ?, ?, ?)'
}

export default QUERYANIMALS;