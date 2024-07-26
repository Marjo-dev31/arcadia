const QUERYIMAGES = {
    DELETE_IMAGE: 'DELETE FROM images WHERE id = ?',
    CREATE_IMAGE_SERVICE: 'INSERT INTO images(id, image_url, id_service, createdAt ) VALUES ( DEFAULT, ?, ?, CURDATE())',
    CREATE_IMAGE_HABITAT: 'INSERT INTO images(id, image_url, id_habitat, createdAt ) VALUES ( DEFAULT, ?, ?, CURDATE())',
    CREATE_IMAGE_ANIMAL: 'INSERT INTO images(id, image_url, id_animal, createdAt ) VALUES ( DEFAULT, ?, ?, CURDATE())',
}

export default QUERYIMAGES;