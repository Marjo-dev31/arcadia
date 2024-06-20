const QUERYHABITATS = {
    SELECT_HABITATS:'SELECT title, description, comment, habitats.id, images.image_url FROM habitats LEFT JOIN images ON habitats.id = images.id_habitat',
    SELECT_HABITAT: 'SELECT * FROM habitats WHERE id = ?',
    CREATE_HABITAT: 'INSERT INTO habitats(id, title, description) VALUES (DEFAULT, ?, ?)',
    UPDATE_HABITAT: 'UPDATE habitats SET title = ?, description = ? WHERE id= ?',
    DELETE_HABITAT: 'DELETE FROM habitats WHERE id = ?',
    CREATE_COMMENT_HABITAT: 'UPDATE habitats SET comment = ? WHERE id= ?',
    DELETE_COMMENT_HABITAT: 'UPDATE habitats SET comment = " " WHERE id= ?'
}

export default QUERYHABITATS;