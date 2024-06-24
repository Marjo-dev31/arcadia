const QUERYEMPLOYEES = {
    SELECT_REPORTS:'SELECT reports.id, food, grammage, DATE_FORMAT(date,"%d/%m/%Y à %H:%i:%s") AS date, id_user, id_animal FROM reports INNER JOIN users ON id_user=users.id WHERE id_animal = ? AND id_role = (SELECT id FROM roles WHERE name = "Employé") ',
    SELECT_REPORT:'SELECT * FROM reports WHERE id = ?',
    CREATE_REPORT:'INSERT INTO reports VALUES (DEFAULT, ?, ?, NOW(), DEFAULT, DEFAULT, ?, ?)',
    UPDATE_REPORT:'UPDATE reports SET food = ?, grammage = ?, id_user = ?, id_animal = ? WHERE id = ?',
    DELETE_REPORT:'DELETE FROM reports WHERE id = ?'
}

export default QUERYEMPLOYEES;

