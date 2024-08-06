const QUERYUSERS = {
    SELECT_USERS: 'SELECT * FROM users',
    CREATE_USER: 'INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?)',
    SELECT_USER:
        'SELECT * FROM users INNER JOIN roles ON roles.id = id_role WHERE email = ? LIMIT 1',
    UPDATE_USER_PASSWORD: 'UPDATE users SET password = ? WHERE id = ? ',
}

export default QUERYUSERS
