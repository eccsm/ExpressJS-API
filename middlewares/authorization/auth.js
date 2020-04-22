const customError = require("../../helpers/errors/CustomError");
const User = require("../../models/user");
const Reply = require("../../models/reply");
const Question = require("../../models/question");
const jwt = require("jsonwebtoken");
const {isTokenIncluded,getAccessTokenFromHeader} = require("../../helpers/token/generateTokenFromUser");
const asyncHandler = require("express-async-handler");


const accessToRoute = (req,res,next) =>
{
    const {JWT_SECRET_KEY} = process.env;

    if(isTokenIncluded(req)){

        accessToken = getAccessTokenFromHeader(req);

        jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded) =>{

            if(err){

                return next(new customError(" Session was ended...",401))

            }
            else{

            req.user = {
                id : decoded.id,
                name : decoded.name
            }

            next();

            }
        })
    
    }
    else{

    return next(new customError("Please Login...",401))
    
    }

}

const isAdmin = asyncHandler( async (req,res,next) =>
{
const {id} = req.user;

let u = await User.findById(id);

if(u.role !== "admin"){

    return next(new customError("This route only allowed for admins...","403"));
}
else{

    next();
}

});

const isQuestionOwner = asyncHandler( async (req,res,next) =>
{
userId = req.user.id;
questionId = req.params.id;

let q = await Question.findById(questionId);

if(q.user != userId){

    return next(new customError("This question only reached by it's owner...","403"));
}
else{

    next();
}

});

const isReplyOwner = asyncHandler( async (req,res,next) =>
{
userId = req.user.id;
replyId = req.params.replyId;

let r = await Reply.findById(replyId);

if(r.user != userId){

    return next(new customError("This Reply only reached by it's owner...","403"));
}
else{

    next();
}

});

module.exports = { accessToRoute,isAdmin,isQuestionOwner,isReplyOwner }