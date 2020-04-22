const User = require("../models/user");

const asyncHandler = require("express-async-handler");

const getUser = asyncHandler( async (req, res, next) => {

const id = req.params.id;

let user = await User.findById(id);

res.status(200).json({
success:true,
data: user
})

next();
});


const getUsers = asyncHandler( async (req, res, next) => {
    
    return res.status(200).json(res.queryResults);
});

module.exports = {getUser,getUsers};