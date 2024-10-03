import  validator from "validator";

export const checkPassword = (req, res, next) => {
    if (!validator.isStrongPassword(req.body.password, [{ minLength: 12 }])) {
        res.status(400).send('wrong pattern')
        return
    }
    next()
};
