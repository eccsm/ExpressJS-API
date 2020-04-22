const express = require("../node_modules/express");

const {getReplies,replyToQuestion,getReply,updateReply,deleteReply,likeReply,undolikeReply} = require("../controllers/reply");

const {accessToRoute,isReplyOwner} = require("../middlewares/authorization/auth");

const {checkQandROnDb} = require("../middlewares/database/dataOps");

const app = express.Router({mergeParams:true});

app.post("/",accessToRoute,replyToQuestion);
app.get("/",getReplies);
app.get("/:replyId",checkQandROnDb,getReply);
app.put("/:replyId/edit",[checkQandROnDb,accessToRoute,isReplyOwner],updateReply);
app.delete("/:replyId/delete",[checkQandROnDb,accessToRoute,isReplyOwner],deleteReply);
app.get("/:replyId/like",[checkQandROnDb,accessToRoute],likeReply);
app.get("/:replyId/undoLike",[checkQandROnDb,accessToRoute],undolikeReply);

module.exports = app;