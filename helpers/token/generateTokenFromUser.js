generateTokenFromUser = (user,res) => {

const token = user.generateJWT();

const {JWT_COOKIE_EXPIRATION} = process.env;

res.status(200).cookie("accessToken",token,{
httpOnly: true,
expires: new Date(Date.now + parseInt(JWT_COOKIE_EXPIRATION) *1000*60) 
}).json({
success:true,
accessToken: token,
data: user
});
}

isTokenIncluded = req => {

return  req.headers.authorization && req.headers.authorization.startsWith("Bearer:") 
}

getAccessTokenFromHeader = req => {

const authStr = req.headers.authorization;

const accessToken = authStr.split(" ")[1];

return accessToken

}

module.exports = {generateTokenFromUser,isTokenIncluded,getAccessTokenFromHeader}