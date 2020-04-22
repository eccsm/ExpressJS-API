const multer  = require("multer");
const path = require("path");
const customError = require("../../helpers/errors/CustomError");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const root = path.dirname(require.main.filename);

        cb(null, path.join(root,"/public/avatars"));
    },
    filename: function (req, file, cb) {
        const ftype = file.mimetype.split("/")[1];
        req.avatar = "avatar_"+ req.user.id + "_" +Date.now()+"."+ftype;
        cb(null, req.avatar);
    }
  });

const fileFilter = (req,file,cb) =>
{


let typesAllowed = ["image/gif","image/jpg","image/jpeg","image/png"];

if(!typesAllowed.includes(file.mimetype)){

    return cb(new customError("This file type not supported...",400),false)
    
}
return cb(null,true)

}
   
  const upload = multer({ storage, fileFilter });

  module.exports= upload;