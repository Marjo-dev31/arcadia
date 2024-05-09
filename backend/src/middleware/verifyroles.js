

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const rolesArray = [...allowedRoles]
        const role = req.role
        const result = rolesArray.includes(role)
        if(!result){
            console.log('You don\'t have the good role')
        }
        next()
    }
}


export default verifyRoles