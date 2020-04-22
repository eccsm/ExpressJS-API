const express = require("../node_modules/express");

const Question = require("../models/question");

const questionQuery = require("../middlewares/query/questionQuery");

const replyQuery = require("../middlewares/query/replyQuery");

const {askQuestion,getQuestions,getQuestion,updateQuestion,deleteQuestion,likeQuestion,undolikeQuestion} = require("../controllers/questions");

const {accessToRoute,isQuestionOwner} = require("../middlewares/authorization/auth");

const {checkQuestionOnDb} = require("../middlewares/database/dataOps");

const reply = require("./reply");

const app = express.Router();

app.post("/ask",accessToRoute,askQuestion);
app.get("/",questionQuery(Question,{
    population :{
        path:"user",
        select: "name title"
    }
}),getQuestions);
app.get("/:id",[checkQuestionOnDb,replyQuery(Question,{
    population :[{
        path:"user",
        select: "name title"
    },
    {
        path:"replies",
        select: "content"
    }
]})],getQuestion);
app.put("/:id",[accessToRoute,checkQuestionOnDb,isQuestionOwner],updateQuestion);
app.delete("/:id",[accessToRoute,checkQuestionOnDb,isQuestionOwner],deleteQuestion);
app.get("/:id/like",[accessToRoute,checkQuestionOnDb],likeQuestion);
app.get("/:id/undoLike",[accessToRoute,checkQuestionOnDb],undolikeQuestion);
app.use("/:questionId/replies",checkQuestionOnDb,reply);

module.exports = app;