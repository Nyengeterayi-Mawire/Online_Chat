const jasonwebtoken = require('jsonwebtoken');
require('dotenv').config();
const request = (req,res,next)=>{
    console.log(`Path : ${req.path} --- Method : ${req.method}`);
    next()
}

const jwt = (req,res,next) => {
    const token = req.header('Authorization');    
    if (token) {        
        jasonwebtoken.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                // Handle specific JWT errors
                if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ expired : true });
                }
                if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Invalid token' });
                }
                return res.status(403).json({ error: 'Token is not valid' });            
            } 
            req.userId = user;
            next();   
        })
    } else {
        return res.status(401).json({ error: 'Authorization header is missing' });
       
    }   
}

module.exports = {request,jwt}