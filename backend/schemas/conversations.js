const mongoose = require('mongoose'); 

const schema = mongoose.Schema; 

const conversationSchema = new schema({
    firstContact :{
        type : schema.Types.ObjectId,
        ref : 'Users',
        require : true
    },
    secondContact :{
        type : schema.Types.ObjectId,
        require : true
    }, 
   
},{timestamps:true});

module.exports = mongoose.model('Conversations',conversationSchema); 