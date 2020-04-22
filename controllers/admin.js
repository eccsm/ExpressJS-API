const User = require("../models/user");

const asyncHandler = require("express-async-handler");

const blockUser = asyncHandler( async (req, res, next) => {

    let bStatus = "unblocked";

    const {id} = req.params;

    let u = await User.findById(id);

    u.blocked = !u.blocked;

    await u.save();

    if(u.blocked){
        bStatus = "blocked"
    }

    res.status(200).json({

        success : true,
        message: u.name + " is " +bStatus
    })

    next();
});

const deleteUser = asyncHandler( async (req, res, next) => {

    const {id} = req.params;

    let u = await User.findById(id);

    await u.remove();

    res.status(200).json({

        success: true,
        message: "User has deleted.."

    })





});

module.exports = {deleteUser,blockUser};