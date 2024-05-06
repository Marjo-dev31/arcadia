import jwt from 'jsonwebtoken';

const generatedAccessToken = (req, res, next) => {
    return jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3h'});
};

export default generatedAccessToken;