const QUERYVETERINARIES = {
    SELECT_REPORTS:
        'SELECT reports.id, food, grammage, date, health, details_condition, id_user, id_animal FROM reports INNER JOIN users ON id_user = users.id WHERE id_animal = ? AND id_role = (select id FROM roles WHERE name = "Vétérinaire")',
    SELECT_REPORT: 'SELECT * FROM reports WHERE id = ?',
    CREATE_REPORT:
        'INSERT INTO reports VALUES (DEFAULT, ?, ?, CURDATE(), ?, ?, ?, ?)',
    UPDATE_REPORT:
        'UPDATE reports SET food = ?, grammage = ?, health = ?, details_condition = ?, id_user = ?, id_animal = ? WHERE id = ?',
    DELETE_REPORT: 'DELETE FROM reports WHERE id = ?',
}

export default QUERYVETERINARIES
