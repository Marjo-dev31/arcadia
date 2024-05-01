const QUERYEMPLOYEES = {
    SELECT_REPORTS:'SELECT * FROM employee_reports WHERE id_animal = ?',
    CREATE_REPORT:'INSERT INTO employee_reports VALUES (DEFAULT, ?, ?, NOW(), ?, ?)',
    DELETE_REPORT:'DELETE FROM employee_reports WHERE id = ?'
}

export default QUERYEMPLOYEES;