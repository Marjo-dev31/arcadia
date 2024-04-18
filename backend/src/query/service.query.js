const QUERYSERVICES = {
    SELECT_SERVICES: 'SELECT * FROM services',
    SELECT_SERVICE: 'SELECT * FROM services WHERE id = ?',
    CREATE_SERVICE: 'INSERT INTO services(id, title, description) VALUES ( DEFAULT, ?, ?)',
    UPDATE_SERVICE: 'UPDATE services SET title = ?, description = ? WHERE id = ? ',
    DELETE_SERVICE: 'DELETE FROM services WHERE id = ?'
}

export default QUERYSERVICES;