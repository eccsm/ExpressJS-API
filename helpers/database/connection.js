const mongoose = require("mongoose");

const connect2DB = () => {

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology:true})
.then(message => console.log("Connected to DB..."))
.catch(err => console.log(err));

}

module.exports = connect2DB;

