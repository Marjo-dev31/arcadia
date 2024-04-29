const QUERYHABITATS = {
    SELECT_HABITATS:'SELECT title, description, habitats.id, images.image_url, images.id AS image_id FROM habitats LEFT JOIN images ON habitats.id = images.id_habitat',
    SELECT_HABITAT: 'SELECT * FROM habitats WHERE id = ?',
    CREATE_HABITAT: 'INSERT INTO habitats(id, title, description) VALUES (DEFAULT, ?, ?)',
    CREATE_COMMENT_HABITAT: 'UPDATE habitats SET comment = ? WHERE id= ?',
    UPDATE_HABITAT: 'UPDATE habitats SET title = ?, description = ? WHERE id= ?',
    DELETE_HABITAT: 'DELETE FROM habitats WHERE id = ?'
}

export default QUERYHABITATS;