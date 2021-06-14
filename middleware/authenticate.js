const jwt = require('jsonwebtoken')

const authenticate = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'wcUm00m')

        req.user = decode
        next()
    }
    catch(error){
        res.json({
            message: 'Auth fail'
        })
    }
}

module.exports = authenticate