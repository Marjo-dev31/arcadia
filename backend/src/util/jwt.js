import jwt from "jsonwebtoken";
import secrets from '../util/secretmanager.js'

const secretsValues = await secrets()

const generatedAccessToken = (email, name) => {
    const token = jwt.sign({ email, name }, secretsValues.ACCESS_TOKEN_SECRET, {
        expiresIn: "3h",
    });
    return token;
};

export default generatedAccessToken;
