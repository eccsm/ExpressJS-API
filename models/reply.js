const mongoose = require("mongoose");

const Question = require("./question");

const User = require("./user");

const schema = mongoose.Schema;

const replySchema = new schema({

content : {

type: String,
required: true,
minlength:[10,"Reply content need to be more than 10 character..."],
},

createdAt:{

    type: Date,
    default: Date.now
},

likes : [{
    type: mongoose.Schema.ObjectId,
    ref: "user"

}],

user:{
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required:true
},

question :{
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required:true
}

});

replySchema.pre("save",async function(next) {
    if(!this.isModified("question")){  next(); }
    else{
        try{
        let q = await Question.findById(this.question);
        await q.replies.push(this.id);
        q.repliesCount = q.replies.length;
        await q.save();
        q = await User.findById(this.user);
        await q.replies.push(this.id);
        q.repliesCount = q.replies.length;
        await q.save();
        }
        catch(err){
            return next(err);
        }
    }
});

replySchema.pre("update",async function(next) {
    if(!this.isModified("question")){  next(); }
    else{
        try{
        let q = await Question.findById(this.question);
        await q.replies.push(this.id);
        q.repliesCount = q.replies.length;
        await q.save();
        q = await User.findById(this.user);
        await q.replies.push(this.id);
        q.repliesCount = q.replies.length;
        await q.save();
        }
        catch(err){
            return next(err);
        }
    }
});

replySchema.post("remove", async function() {
    
    let q = await Question.findById(this.question);
    await q.replies.splice(q.replies.indexOf(this.question),1);
    q.repliesCount = q.replies.length;
    await q.save();
    q = await User.findById(this.user);
    await q.replies.splice(q.replies.indexOf(this.question),1);
    q.repliesCount = q.replies.length;
    await q.save();

});

module.exports = mongoose.model("Reply",replySchema);