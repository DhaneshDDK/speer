const user = require('../Models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res)=>{
    try {
        const {fullName, email, password, confirmPassword, image}  = req.body; 

            //verification 
            if(!fullName || !email || !password || !confirmPassword) {
                return res.status(403).send({
                    success: false,
                    message: "All Fields are required"
                });
            }

            if(password !== confirmPassword ){
                return res.status(400).json({
                    success: false,
                    message: "Password and Confirm Password do not match. Please try again.",
                });
               }
            
            const User = await user.findOne({email});

            if(User) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists. Please sign in to continue.",
                });
               }

             
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await user.create({
            email : email,
            password : hashedPassword,
            fullName : fullName,
            image : image
        });

        return res.status(200).json({
			success: true,
			newUser,
			message: "User registered successfully",
		});

    

    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
    }
}


exports.login = async (req,res)=>{
    try {
        const {email, password} = req.body;


         //verification 
         if(!email || !password) {
            return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
        }

        const User = await user.findOne({email});
        if(!User){
            return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
        }

        
        //decrypt the password from the database and verify with the password entered by the user
        const flag = await bcrypt.compare( password, User.password );
        //if not matched
        if(!flag){
            return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
        }

        
        //created JWT token and save in the form of cookie
        const payload = {
            name : User.fullName,
            email : User.email,
        }

        const token = jwt.sign(  payload,  process.env.JWT_SECRET,
            { expiresIn: "24h", }
        );

        User.token = token;
        User.password = undefined;

        res.status(200).cookie("jwt-token", token, {
            expires : new Date(Date.now()+ 3*24*60*60*1000),
            httpOnly : true
        }).json({
            success: true,
				token,
				User,
				message: `User Login Success`,
        })



    } catch (error) {
        return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`+ error.message,
		});
    }
}
