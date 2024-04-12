const QUERY = {
    SELECT_SERVICES: 'SELECT * FROM services',
    SELECT_SERVICE: 'SELECT * FROM services WHERE service_uuid = ?',
    CREATE_SERVICE: 'INSERT INTO services(service_uuid, title, description) VALUES (UUID(), ?, ?)',
    UPDATE_SERVICE: 'UPDATE services SET title = ?, description = ? WHERE service_uuid = ?',
    DELETE_SERVICE: 'DELETE FROM services WHERE service_uuid = ?'
}

export default QUERY;