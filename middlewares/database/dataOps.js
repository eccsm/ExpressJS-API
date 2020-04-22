const customError = require("../../helpers/errors/CustomError");

const User = require("../../models/user");

const Question = require("../../models/question");

const Reply = require("../../models/reply");

const asyncHandler = require("express-async-handler");


const checkUserOnDb = asyncHandler( async (req, res, next) =>{

    const id = req.params.id;

    let user = await User.findById(id);

if(!user)
{
    return next(new customError("User can not found...",400))
}
else{

    return next()
}

});

const checkQuestionOnDb = asyncHandler( async (req, res, next) =>{

    const questionId = req.params.id || req.params.questionId;

    let q = await Question.findById(questionId);

if(!q)
{
    return next(new customError("Question can not found...",400))
}
else{

    return next()
}

});

const checkQandROnDb = asyncHandler( async (req, res, next) =>{

    const questionId = req.params.questionId;
    
    const replyId = req.params.replyId;

    const r = await Reply.findOne({
        _id : replyId,
        question : questionId 
    });

if(!r)
{
    return next(new customError("Reply can not found...",400))
}
else{

    return next()
}

});


module.exports = {checkUserOnDb,checkQuestionOnDb,checkQandROnDb};