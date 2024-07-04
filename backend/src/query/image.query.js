const QUERYIMAGES = {
    // SELECT_IMAGES: 'SELECT * FROM images',
    // SELECT_IMAGE: 'SELECT * FROM images WHERE id = ?',
    DELETE_IMAGE: 'DELETE FROM images WHERE id = ?',
    // SELECT_SERVICES_IMAGES: 'SELECT * FROM services INNER JOIN images ON services.id = images.id_service',
    // UPDATE_SERVICE_IMAGE: 'UPDATE images SET image_url = ?, id_service= ? WHERE id = ? ',
    // SELECT_HABITATS_IMAGES: 'SELECT * FROM habitats INNER JOIN images ON habitats.id = images.id_habitat',
    CREATE_IMAGE_SERVICE: 'INSERT INTO images(id, image_url, id_service ) VALUES ( DEFAULT, ?, ?)',
    CREATE_IMAGE_HABITAT: 'INSERT INTO images(id, image_url, id_habitat ) VALUES ( DEFAULT, ?, ?)',
    CREATE_IMAGE_ANIMAL: 'INSERT INTO images(id, image_url, id_animal ) VALUES ( DEFAULT, ?, ?)',
    // SELECT_ANIMALS_IMAGES: 'SELECT * FROM animals INNER JOIN images ON animals.id = id_animals'
}

export default QUERYIMAGES;