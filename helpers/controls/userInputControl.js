const bcrypt = require("bcryptjs");

const signInInputs = (email,password) => {
return email && password
}

const validateUser = (password,decryptedPw) =>
{

return bcrypt.compareSync(password,decryptedPw);

}


module.exports = {signInInputs,validateUser}