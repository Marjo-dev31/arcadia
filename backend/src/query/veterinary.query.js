const QUERYVETERINARIES = {
    SELECT_REPORTS:'SELECT * FROM veterinary_reports WHERE id_animal = ?',
    SELECT_REPORT:'SELCT * FROM veterinary_reports WHERE id = ?',
    CREATE_REPORT: 'INSERT INTO veterinary_reports values (DEFAULT, ?, ?, CURDATE(), ?, ?, ?, ?)',
    DELETE_REPORT: 'DELETE FROM veterinary_reports WHERE id = ?'
}

export default QUERYVETERINARIES