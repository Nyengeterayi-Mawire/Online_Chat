const Message = require('../schemas/messages');

const createMessage = async(req,res)=>{
    const {conversationID,userID,messageText} = req.body;
    try{
        const message = await Message.create({conversationID,userID,messageText});
        if(!message){
            return res.status(404).json({error:'Failed to create message'})
        }
        res.status(200).json(message)
    }catch(err){
        res.json({error:err.message})
    }
};

const deleteMessage = async(req,res)=>{
    const {id} = req.params;
    try{
        const message = await Message.findByIdAndDelete(id);
        if(!message){
            return res.status(404).json({error:'Message does not exist'})
        }
        res.status(200).json(message)
    }catch(err){
        res.json({error:err.message})
    }
};

const allMessages = async(req,res)=>{
    const {id} = req.params;
    try{
        const messages = await Message.find({conversationID:id})
        res.status(200).json(messages)
    }catch(err){
        res.json({error:err.message})
    }
};

module.exports = {createMessage,deleteMessage,allMessages};