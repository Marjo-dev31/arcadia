const QUERYIMAGES = {
    SELECT_IMAGES: 'SELECT * FROM images',
    SELECT_IMAGE: 'SELECT * FROM images WHERE id = ?',
    DELETE_IMAGE: 'DELETE FROM images WHERE id = ?',
    SELECT_SERVICES_IMAGES: 'SELECT * FROM services INNER JOIN images ON services.id = images.id_service',
    CREATE_IMAGE_SERVICE: 'INSERT INTO images(id, image_url, id_service ) VALUES ( DEFAULT, ?, ?)',
    UPDATE_SERVICE_IMAGE: 'UPDATE images SET image_url = ?, id_service= ? WHERE id = ? '
}

export default QUERYIMAGES;