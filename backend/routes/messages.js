const router = require('express').Router();
const {allMessages,deleteMessage,createMessage}  = require('../controllers/messages'); 
const {request,jwt} = require('../middleware/middleware');

router.get('/:id',request,jwt,allMessages);
router.delete('/:id',request,jwt,deleteMessage);
router.post('/',request,jwt,createMessage);

module.exports = router;

