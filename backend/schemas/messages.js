const mongoose = require('mongoose'); 

const schema = mongoose.Schema; 

const messagesSchema = new schema({
    conversationID :{
        type : schema.Types.ObjectId,
        ref : 'Conversations',
        require : true
    },
    userID :{
        type : schema.Types.ObjectId,
        ref : 'Users',
        require : true
    },
    messageText:{
        type : String,
        require : true
    }, 
   
},{timestamps:true});

module.exports = mongoose.model('Messages',messagesSchema); 