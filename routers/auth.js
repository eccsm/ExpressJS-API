const express = require("express");

const {register,profile,login,logout,uploadAvatar,forgotPassword,resetPassword,updateUser} = require("../controllers/auth"); 

const {accessToRoute} = require("../middlewares/authorization/auth");

const avatarUpload = require("../middlewares/avatar/avatarUpload");

const app = express.Router();


app.post("/register",register);
app.get("/login",login);
app.get("/logout",accessToRoute,logout);
app.get("/profile",accessToRoute,profile);
app.post("/forgotPassword",forgotPassword);
app.post("/avatarUpload",[accessToRoute,avatarUpload.single("avatar")],uploadAvatar);
app.put("/resetPassword",resetPassword);
app.put("/updateUser",accessToRoute,updateUser)

module.exports = app;