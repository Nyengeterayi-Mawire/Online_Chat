const {register,login,singleUser,allUsers,deleteUser,updateUser,search} = require('../controllers/users'); 
const {request,jwt} = require('../middleware/middleware');
const router = require('express').Router(); 
const multer = require('multer'); 
const path = require('path');

const storage = multer.diskStorage({
    destination : './uploads',
    filename : function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage : storage
}).single('image')



router.get('/',request,jwt,allUsers);
router.get('/:id',request,jwt,singleUser);
router.post('/register',request,register);
router.post('/login',request,login); 
router.delete('/:id',request,jwt,deleteUser); 
router.patch('/:id',request,jwt,upload,updateUser); 
router.post('/search',request,jwt,search); 

module.exports = router;


