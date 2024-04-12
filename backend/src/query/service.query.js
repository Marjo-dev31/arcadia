const QUERY = {
    SELECT_PATIENTS: 'SELECT * FROM services',
    SELECT_PATIENT: 'SELECT * FROM services WHERE service_uuid = ?',
    CREATE_PATIENT: 'INSERT INTO services(service_uuid, title, description) VALUES (UUID(), ?, ?)',
    UPDATE_PATIENT: 'UPDATE services SET title = ?, description = ? WHERE service_uuid = ?',
    DELETE_PATIENT: 'DELETE FROM services WHERE service_uuid = ?'
}

export default QUERY;