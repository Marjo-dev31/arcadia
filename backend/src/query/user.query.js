const QUERYUSERS = {
    SELECT_USERS_VETERINARY: 'SELECT users.id, email, lastname, firstname, id_role FROM users INNER JOIN roles ON roles.id = id_role WHERE roles.name IN ("Vétérinaire")',
    SELECT_USERS_EMPLOYEE: 'SELECT users.id, email, lastname, firstname, id_role FROM users INNER JOIN roles ON roles.id = id_role WHERE roles.name IN ("Employé")',
    CREATE_USER: 'INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?)',
    SELECT_USER:
        'SELECT users.id, firstname, lastname, email, password, roles.name AS role FROM users INNER JOIN roles ON roles.id = id_role WHERE email = ? LIMIT 1',
    UPDATE_USER_PASSWORD: 'UPDATE users SET password = ? WHERE id = ? ',
}

export default QUERYUSERS
