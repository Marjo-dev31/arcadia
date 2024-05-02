const QUERYEMPLOYEES = {
    SELECT_REPORTS:'SELECT * FROM employee_reports WHERE id_animal = ?',
    SELECT_REPORT:'SELECT * FROM employee_reports WHERE id = ?',
    CREATE_REPORT:'INSERT INTO employee_reports VALUES (DEFAULT, ?, ?, NOW(), ?, ?)',
    UPDATE_REPORT:'UPDATE employee_reports SET food = ?, grammage = ?, id_animal = ?,  id_user = ? WHERE id = ?',
    DELETE_REPORT:'DELETE FROM employee_reports WHERE id = ?'
}

export default QUERYEMPLOYEES;