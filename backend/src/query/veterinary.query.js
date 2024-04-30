const QUERYVETERINARIES = {
    SELECT_REPORTS:'SELECT * FROM veterinary_reports WHERE id_animal = ?',
    CREATE_REPORT: 'INSERT INTO veterinary_reports values (DEFAULT, ?, ?, CURDATE(), ?, ?, ?, ? )'
}

export default QUERYVETERINARIES