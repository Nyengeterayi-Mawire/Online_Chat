const router = require('express').Router();
const {allConversations,singleConversations,create,deleteConversation}  = require('../controllers/conversations'); 
const {request,jwt} = require('../middleware/middleware');

router.get('/',request,jwt,allConversations);
router.post('/single',request,jwt,singleConversations);
router.post('/',request,jwt,create);
router.delete('/:id',request,jwt,deleteConversation);

module.exports = router;