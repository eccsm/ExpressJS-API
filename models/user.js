const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const schema = mongoose.Schema;

const jwt = require("jsonwebtoken");

const Question = require("./question");

const userSchema = new schema({

name : {
type: String,
required: [true,"Please enter name..."]
},

email : {

type: String,
unique: true,
required: true,
match: [
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    "Please enter email with correct format..."
]
},

role : {

type: String,
default: "user",
enum:["user","admin"]

},

password : {

type:String,
required: [true,"Please enter a password..."],
select: false,
minlength: [6,"Password needs to be at least 6 character.."]

},

createdAt : {

type: Date,
default: Date.now

},

title : {

    type: String
},

about : {

    type: String
},

place : {

    type:String
},

website : {

    type:String

},

profileImage : {

    type:String,
    default:"default.jpg"
},

blocked : {

    type: Boolean,
    default: false
},

forgotPasswordToken : {

    type: String
},

forgotPasswordTokenExpires : {

    type: Date
},

replies : [{
    type: mongoose.Schema.ObjectId,
    ref: "Reply"
    }],

repliesCount : {

        type: Number,
        default:0
    },


});


userSchema.methods.generateJWT = function(){

    const {JWT_SECRET_KEY,JWT_EXPIRATION} = process.env;

    const payload = {
        id : this.id,
        name : this.name
    }

    const token = jwt.sign(payload,JWT_SECRET_KEY,{expiresIn:JWT_EXPIRATION});

    return token;

}

userSchema.methods.forgotPasswordTokenGenerator = function(){

    const {FORGOT_PASSWORD_TOKEN_EXPIRATION} = process.env;

    const randomHex = crypto.randomBytes(15).toString("hex");

    const tokenToMail = crypto.createHash("SHA256").update(randomHex).digest("hex");

    this.forgotPasswordToken = tokenToMail;

    this.forgotPasswordTokenExpires = Date.now() + parseInt(FORGOT_PASSWORD_TOKEN_EXPIRATION);

    return tokenToMail;

}

userSchema.pre("save",function(next) {
    if(!this.isModified("password")){
        
        next();
 
    }
    else{
        bcrypt.genSalt(10, (err, salt) => {
            if(err) next(err);
        
            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err) next(err);
                this.password = hash;
                next(); 
            });
        });  
    }
});

userSchema.pre("update",function(next) {
    if(!this.isModified("password")){
        
        next();
 
    }
    else{
        bcrypt.genSalt(10, (err, salt) => {
            if(err) next(err);
        
            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err) next(err);
                this.password = hash;
                next(); 
            });
        });  
    }
});

userSchema.post("remove", async function() {
    
    let q = Question.find({user : this.id});
    await Question.updateMany({
        user : this.id
    },{"$set":{user: undefined}})
});


module.exports = mongoose.model("user",userSchema);
