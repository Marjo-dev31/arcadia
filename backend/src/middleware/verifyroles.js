

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const rolesArray = [...allowedRoles]
        const role = req.role
        const result = rolesArray.includes(role)
        if(!result){
            console.log('You don\'t have the good role')
            res
            .status(httpStatus.BAD_REQUEST.code)
            .send(
              new Response(
                httpStatus.BAD_REQUEST.code,
                httpStatus.BAD_REQUEST.status,
                `Wrong role`
              )
            );
        }
        next()
    }
}


export default verifyRoles