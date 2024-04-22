const QUERYIMAGES = {
    SELECT_IMAGES: 'SELECT * FROM images',
    SELECT_IMAGE: 'SELECT * FROM images WHERE id = ?',
    CREATE_IMAGE_SERVICE: 'INSERT INTO images(id, image_url,id_service ) VALUES ( DEFAULT, ?, ?)',
    UPDATE_IMAGE: 'UPDATE images SET image_url = ?, id_animal = ?, id_habitat= ?, id_service= ? WHERE id = ? ',
    DELETE_IMAGE: 'DELETE FROM images WHERE id = ?'
}

export default QUERYIMAGES;