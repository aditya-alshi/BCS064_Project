const jwt = require("jsonwebtoken");

function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.status(401).json({
            error: "Unauthorized NT"
        })
    }
    const jwtToken = authHeader.split(" ")[1]
    if(!jwtToken) {
        return res.status(401).json({
            error: "Unauthorized NT"
        })
    }

    jwt.verify(jwtToken, process.env.ADMIN_JWT_PRIVATE_KEY, (error, decoded) => {
        if(error) {
            return res.status(401).json({
                error: "Unauthorized IVT"
            })
        }

        next();
    })

}

module.exports = {
    authenticateAdmin
}