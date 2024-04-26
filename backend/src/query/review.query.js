const QUERYREVIEWS = {
    SELECT_REVIEWS: 'SELECT * FROM reviews',
    SELECT_REVIEW:'SELECT * FROM reviews WHERE id = ?',
    CREATE_REVIEW: 'INSERT INTO reviews(id, pseudo, content, date, status) VALUES (DEFAULT, ?, ?, CURDATE(), false)',
    UPDATE_REVIEW_STATUS: 'UPDATE reviews SET status = ? WHERE id = ?'
}

export default QUERYREVIEWS