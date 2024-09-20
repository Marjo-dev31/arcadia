import jwt from "jsonwebtoken";

const generatedAccessToken = (email, role) => {
    const token = jwt.sign({ email, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3h",
    });
    return token;
};

export default generatedAccessToken;
