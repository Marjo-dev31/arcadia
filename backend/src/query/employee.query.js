const QUERYEMPLOYEES = {
    SELECT_REPORTS:'SELECT id, food, grammage, DATE_FORMAT(date,"%d/%m/%Y à %H:%i:%s") AS date, id_user, id_animal FROM employee_reports WHERE id_animal = ?',
    SELECT_REPORT:'SELECT * FROM employee_reports WHERE id = ?',
    CREATE_REPORT:'INSERT INTO employee_reports VALUES (DEFAULT, ?, ?, NOW(), ?, ?)',
    UPDATE_REPORT:'UPDATE employee_reports SET food = ?, grammage = ?, id_user = ?, id_animal = ? WHERE id = ?',
    DELETE_REPORT:'DELETE FROM employee_reports WHERE id = ?'
}

export default QUERYEMPLOYEES;