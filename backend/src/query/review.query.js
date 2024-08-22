const QUERYREVIEWS = {
    SELECT_REVIEWS:
        'SELECT id, pseudo, content, DATE_FORMAT(date,"%d/%m/%Y") AS date, status FROM reviews',
    SELECT_REVIEWS_TRUE:
        'SELECT id, pseudo, content, DATE_FORMAT(date,"%d/%m/%Y") AS date, status FROM reviews where status = true',
    SELECT_REVIEW: 'SELECT * FROM reviews WHERE id = ?',
    CREATE_REVIEW:
        'INSERT INTO reviews(id, pseudo, content, date, status) VALUES (DEFAULT, ?, ?, CURDATE(), false)',
    UPDATE_REVIEW_STATUS:
        'UPDATE reviews SET status = ?, id_employee = ? WHERE id = ?',
}

export default QUERYREVIEWS
