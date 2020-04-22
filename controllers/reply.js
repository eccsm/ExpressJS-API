const Question = require("../models/question");

const Reply = require("../models/reply");

const CustomError = require("../helpers/errors/CustomError");

const asyncHandler = require("express-async-handler");

const getReplies = asyncHandler( async (req, res, next) => {
    const questionId = req.params.questionId;

    const q = await Question.findById(questionId).populate("replies");

    const replies = q.replies;

res.status(200).json({

    success: true,
    count: replies.length,
    data: replies
});

});

const replyToQuestion = asyncHandler( async (req, res, next) => {

    const questionId = req.params.questionId;
    
    const userId = req.user.id;

    let infos = req.body; 

    let r = await Reply.create({

        ...infos,
        user: userId,
        question: questionId
    })


    res.status(200).json({
    
        success: true,
        data: r
    });
    
});

const getReply = asyncHandler( async (req, res, next) => {

    const {replyId} = req.params;

    let r = await Reply.findById(replyId)
    .populate({
        path: "question",
        select: "title"
    })
    .populate({
        path:"user",
        select: "name role"
    });
      
    res.status(200).json({

        success: true,
        data: r
    })
    
});

const updateReply = asyncHandler( async (req, res, next) => {

    const {replyId} = req.params;

    const ups = req.body;

    let r = await Reply.findByIdAndUpdate(replyId,ups,{

        new: true,
        runValidators: true
        });

        res.status(200).json({

            success: true,
            data: r
        })

});

const deleteReply = asyncHandler( async (req, res, next) => {

    const {replyId} = req.params;

    let r = await Reply.findById(replyId);

    await r.remove();


    res.status(200).json({
        success: true,
        message: "Reply has deleted..."
    });



});

const likeReply = asyncHandler( async (req, res, next) => {

    const {replyId} = req.params;

    let r = await Reply.findById(replyId);

   
    if(r.user != req.user.id){
        if(r.likes.includes(req.user.id)){
            return next(new CustomError("Already liked...",400))
        }
        else{
            r.likes.push(req.user.id);
            await r.save();
            res.status(200).json({
                success: true,
                data: r
            });
            next();
        }
        
    }
    else{
        return next(new CustomError("Users can't like own replies",400))
    }


});

const undolikeReply = asyncHandler( async (req, res, next) => {

    const {replyId} = req.params;

    let r = await Reply.findById(replyId);

      
        if(!r.likes.includes(req.user.id)){
            return next(new CustomError("You can't do this operation...",400))
        }
        else{
            const index = r.likes.indexOf(req.user.id);
            r.likes.splice(index,1);
            await r.save();
            res.status(200).json({
                success: true,
                data: r
            });
            next();
        }

});

module.exports = {getReplies,replyToQuestion,getReply,updateReply,deleteReply,likeReply,undolikeReply}