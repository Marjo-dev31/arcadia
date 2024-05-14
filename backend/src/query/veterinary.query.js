const QUERYVETERINARIES = {
    SELECT_REPORTS:'SELECT id, food, grammage, DATE_FORMAT(date, "%d/%m/%Y") AS date, health, details_condition, id_user, id_animal FROM veterinary_reports WHERE id_animal = ?',
    SELECT_REPORT:'SELECT * FROM veterinary_reports WHERE id = ?',
    CREATE_REPORT: 'INSERT INTO veterinary_reports VALUES (DEFAULT, ?, ?, CURDATE(), ?, ?, ?, ?)',
    UPDATE_REPORT: 'UPDATE veterinary_reports SET food = ?, grammage = ?, health = ?, details_condition = ?, id_user = ?, id_animal = ? WHERE id = ?',
    DELETE_REPORT: 'DELETE FROM veterinary_reports WHERE id = ?'
}

export default QUERYVETERINARIES