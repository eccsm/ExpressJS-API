const User = require("../models/user");

const asyncHandler = require("express-async-handler");

const CustomError = require("../helpers/errors/CustomError");

const {generateTokenFromUser} = require("../helpers/token/generateTokenFromUser");

const {signInInputs,validateUser} = require("../helpers/controls/userInputControl");

const  sendMail = require("../helpers/mail/tokenSenderForPass");

const register = asyncHandler( async (req, res, next) => {

const {name,email,role,password} = req.body;

const user = await User.create({
        name,
        email,
        role,
        password
    });

    generateTokenFromUser(user,res);
});


const login = asyncHandler( async (req, res, next) => {

    const {email,password} = req.body;
    

    if(signInInputs(email,password))
    {
        const u = await User.findOne({email}).select("+password");

        if(validateUser(password,u.password))
        {
        generateTokenFromUser(u,res);
        next();
        }
        else{
            return next(new CustomError("Password didn't match..",400))

        }
        
    }
    else{
        
        return next(new CustomError("email or password field can not be a blank.."))

        }
      
});


const logout = asyncHandler( async (req, res, next) => {

          res.status(200).cookie({
            httpOnly:true,
            expires: new Date(Date.now())
          }).json({
            status: true,
            message: "Logged Out..."
          }); 

          
});

const profile = (req,res,next) =>{

res.json({

success: true,
description:"Welcome "+req.user.name,
data: {
    id: req.user.id,
    name: req.user.name
}
})   
}

const uploadAvatar = asyncHandler( async (req, res, next) => {

const user = await User.findByIdAndUpdate(req.user.id,{
    "profileImage": req.avatar
},{
    new: true,
    runValidators: true
})

    res.status(200).json({

        success: true,
        message: "Avatar is uploaded...",
        data: user
    });
});

const forgotPassword = asyncHandler( async (req, res, next) => 
{
    const forgottensMail =  req.body.email;

    const user = await User.findOne({email : forgottensMail});

    if(!user){

        return next(new CustomError("This mail not signed up..."),400)
    }
    
    const passwordToken = user.forgotPasswordTokenGenerator();

    await user.save();

    const sentURLinMail = "http://localhost:5000/api/auth/resetPassword?token="+passwordToken;
    
        
    try{ 

            await sendMail({

            from: process.env.SMTP_USER,
            to: forgottensMail,
            subject: "ResetPassword",
            html: "sentURLinMail"
        });
        
        res.status(200).json({

            success: true,
            message: "Mail sent to " + user.email,
            data: user
        });


    }
    
    catch(err)
    {

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpires = undefined;

        await user.save();

        return next(new CustomError("Mail could not be send "+err,500));


    }
});

const resetPassword = asyncHandler( async (req, res, next) => 
{

const {token} = req.query;

const {password} = req.body;

if(!token)
{
    return next(new CustomError("Token was expired...",400))
}
else{
let user = await User.findOne({
    forgotPasswordToken : token,
    forgotPasswordTokenExpires : {$gt : Date.now()}
})

if(!user)
{

    return next(new CustomError("Please check your informations...",400))
}
else{

user.password = password;
user.forgotPasswordToken = undefined;
user.forgotPasswordTokenExpires = undefined;
await user.save();
res.status(200).json({

success: true,
message: "Your password successfully updated..."


});

return next();

}
}

});

const updateUser = asyncHandler( async (req, res, next) => 
{

const updates = req.body;

const id = req.user.id;

let u = await User.findByIdAndUpdate(id,updates,{

new: true,
runValidators: true
});

res.status(200).json({

    success: true,
    message: u.name + " has updated",
    data: u
});

next();

});

module.exports = {register,profile,login,logout,uploadAvatar,forgotPassword,resetPassword,updateUser};