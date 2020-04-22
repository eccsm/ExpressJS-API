const User = require("../models/user");

const Question = require("../models/question");

const asyncHandler = require("express-async-handler");

const CustomError = require("../helpers/errors/CustomError");

const askQuestion = asyncHandler( async (req, res, next) => {

    let qData = req.body;

    let q = await Question.create({
        ...qData,
        user: req.user.id
    })

    res.json({
        success:true,
        message:"Question "+q.title+" has asked...",
        data: q
            });

});

const getQuestions = asyncHandler( async (req, res, next) => {

return res.status(200).json(res.queryResults);

});

const getQuestion = asyncHandler( async (req, res, next) => {

    return res.status(200).json(res.queryResults);
});

const updateQuestion = asyncHandler( async (req, res, next) => {

    const {id} = req.params;

    const ups = req.body;

    let q = await Question.findByIdAndUpdate(id,ups,{

        new: true,
        runValidators: true
        });

        res.status(200).json({

            success: true,
            data: q
        })

});

const deleteQuestion = asyncHandler( async (req, res, next) => {

    const {id} = req.params;

    await Question.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Question has deleted..."
    });



});

const likeQuestion = asyncHandler( async (req, res, next) => {

    const {id} = req.params;

    let q = await Question.findById(id);

   
    if(q.user != req.user.id){
        if(q.likes.includes(req.user.id)){
            return next(new CustomError("Already liked...",400))
        }
        else{
            await q.likes.push(req.user.id);
            q.likesCount = q.likes.length;
            await q.save();
            res.status(200).json({
                success: true,
                data: q
            });
            next();
        }
        
    }
    else{
        return next(new CustomError("Users can't like own questions",400))
    }


});

const undolikeQuestion = asyncHandler( async (req, res, next) => {

    const {id} = req.params;

    let q = await Question.findById(id);

      
        if(!q.likes.includes(req.user.id)){
            return next(new CustomError("You can't do this operation...",400))
        }
        else{
            const index = q.likes.indexOf(req.user.id);
            await q.likes.splice(index,1);
            q.likesCount = q.likes.length;
            await q.save();
            res.status(200).json({
                success: true,
                data: q
            });
            next();
        }

});

module.exports = {askQuestion,getQuestions,getQuestion,updateQuestion,deleteQuestion,likeQuestion,undolikeQuestion};