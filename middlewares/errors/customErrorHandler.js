const CustomError = require("../../helpers/errors/CustomError");

const error = (err,req,res,next) =>{
let cuserr = err;

if(err.name === "SyntaxError"){

    cuserr = new CustomError("Unexpected Syntax",400);
}

if(err.name === "ValidationError"){


    cuserr = new CustomError(err.message,400);
}

if(err.code === 11000){


    cuserr = new CustomError("Duplicate value found,please check your inputs...",400);
}


if(err.name === "CastError"){


    cuserr = new CustomError("The parameter id is not correct format...",400);
}

res.status(cuserr.status || 500).json({

success: "false",
message: cuserr.message

});


}

module.exports = error;