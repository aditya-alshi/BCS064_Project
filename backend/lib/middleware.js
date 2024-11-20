const jwt = require('jsonwebtoken');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
    
function verifySellerLoginMW(req, res, next){
    
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({
        message: 'Unauthorized: No token provided'
    });

    const jwtToken = authHeader.split(" ")[1]
    if(!jwtToken) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided'
        });
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET_PRIVATE_KEY, (err, decoded)=> {
        if(err) {
            return res.status(401).json({
                message: "Forbidden: Invalid token"
            });
        }

        console.log(decoded)
        req.seller_id = decoded;
       console.log("Jwt verified succesfully")
        next();
    })


}

module.exports ={ verifySellerLoginMW};