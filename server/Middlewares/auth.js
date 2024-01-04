const jwt = require('jsonwebtoken');

exports.auth = async (req,res,next)=>{
    try {
        const token =  req.body.token || req.header('Authorization').replace('Bearer ','') || req.cookies.token ;
        
        //if token missing, then return response
        // console.log(token)
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
           //verify token
     try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
   //  console.log(req.user);
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'token is invalid',
        });
    }
   
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}