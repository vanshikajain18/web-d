  
// time : { type : Date, default: Date.now }
// create post => caption , pimage , uid , multer
// get all myfollowing posts => feeds posts
// update posts => edit post => caption edit
// delete posts => delete post by id
// get my posts => get only my posts => profile page !!! 

const postsRouter = require("express").Router() ;
const multer = require("multer") ;
const path = require("path") ;
const { createPost, getMyPosts, getFeedPosts, deletePost, updatePost } = require("../controller/postController");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/posts');        
    },
    filename: function(req, file, cb){
        // console.log(file);                     
        cb(null, Date.now() + path.extname(file.originalname));    
    }
});
const fileFilter = function(req, file, cb){
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'  ) {
        cb(null, true); 
    } else {
        cb(null, false); 
    }
}

const upload = multer({storage,fileFilter }) ;

postsRouter.route("/:id/newpost").post(upload.single('postImage') , createPost) ;
postsRouter.route("/:pid").delete(deletePost).patch(updatePost) ;
postsRouter.route("/:id").get(getMyPosts);
postsRouter.route("/:id/feed").get(getFeedPosts) ;

module.exports= postsRouter ;