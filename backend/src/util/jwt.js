import jwt from "jsonwebtoken";

const generatedAccessToken = (email, name, res, next) => {
    const token = jwt.sign({ email, name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3h",
    });
    return token;
};

export default generatedAccessToken;
