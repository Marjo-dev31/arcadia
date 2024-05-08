import jwt from 'jsonwebtoken';

const generatedAccessToken = (req, res, next) => {
   const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3h'});
    return token
};

export default generatedAccessToken;