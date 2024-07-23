const QUERYSERVICES = {
    SELECT_SERVICES: 'SELECT title, description, services.id, images.image_url, images.id AS image_id FROM services LEFT JOIN images ON services.id = images.id_service',
    SELECT_SERVICE: 'SELECT * FROM services WHERE id = ?',
    CREATE_SERVICE: 'INSERT INTO services(id, title, description) VALUES ( DEFAULT, ?, ?)',
    UPDATE_SERVICE: 'UPDATE services SET title = ?, description = ? WHERE id = ? ',
    DELETE_SERVICE: 'DELETE FROM services WHERE id = ?'
}

export default QUERYSERVICES;