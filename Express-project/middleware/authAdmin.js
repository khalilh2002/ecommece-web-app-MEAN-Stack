
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; 
const User = require('../models/User')

const authAdmin = async (req ,res ,next)=>{
    try{

        const cookie = req.cookies['authToken'] 
        if(!cookie){
            return res.status(500).json({
                message : 'no cookie'
            })
        }
        const claims = jwt.decode(cookie,secretKey)
        const user = await User.findOne({ email: claims.email });
        if(user.role==='admin'){
           next()
        }else{
            return res.status(401).send('Access Denied. not admin.');
        }
    
    }catch(e){
        res.json({
            message : "unauthenticated",
            error : e
        })
    }
    
}

module.exports = authAdmin;
