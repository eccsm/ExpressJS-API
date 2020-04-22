const mongoose = require("mongoose");

const slugify = require("slugify");

const schema = mongoose.Schema;

const questionSchema = new schema({

title : {
type: String,
required: [true,"Please enter title..."],
minlength:[10,"Title need to be more than 10 character..."],
unique: true

},

content : {

type: String,
required: true,
minlength:[20,"Content need to be more than 10 character..."],
},

slug :String,

createdAt : {
type: Date,
default: Date.now

},

likes : [{
    type: mongoose.Schema.ObjectId,
    ref: "user"
    }],

likesCount : {

    type: Number,
    default:0
    },

replies : [{
    type: mongoose.Schema.ObjectId,
    ref: "Reply"
    }],

repliesCount : {

        type: Number,
        default:0
    },

user : {

    type : mongoose.Schema.ObjectId,
    required: true,
    ref: "user"
}});


questionSchema.methods.setSlug = function(){

    return slugify(this.title, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g,
        lower: true,   
      })
      

}

questionSchema.pre("save",function(next) {
    if(!this.isModified("title")){
        
        next();
 
    }
    else{
        this.slug = this.setSlug();
        next();
    }
});

questionSchema.pre("update",function(next) {
    if(!this.isModified("title")){
        
        next();
 
    }
    else{
        this.slug = this.setSlug();
        next();
    }
});


module.exports = mongoose.model("Question",questionSchema);
