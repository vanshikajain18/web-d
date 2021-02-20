const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require("../controller/userController");
const multer = require("multer") ;
const path = require("path") ;
const userRouter= require("express").Router() ;

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/users');        //to set destination of images 
    },
    filename: function(req, file, cb){
        // console.log("Inside multer");
        console.log(file);                     
        cb(null, Date.now() + path.extname(file.originalname));     //to set name of image
    }
});
const fileFilter = function(req, file, cb){
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'  ) {
        cb(null, true); // accept file if true passed 
    } else {
        cb(null, false); // reject fileb
    }
}

const upload = multer({storage,fileFilter }) ; //an instance of multer in which the destination and filter is passed 

//"localhost:3000/api/user"
userRouter.route("").get(getAllUser).post( upload.single('user') , createUser) ;
//upload.single function creates and uploads an image in the public folder  
//it will take that file as input whose key will be 'user' (in form data).
 
userRouter.route("/:id").get(getUserById).patch( upload.single('user') , updateUser).delete(deleteUser) ;
//patch method is for update and delete for delete 

module.exports.userRouter = userRouter ;