const Conversation = require('../schemas/conversations');
const users = require('../schemas/users');
const User = require('../schemas/users');

const allConversations = async(req,res)=>{
    try{
        const conversations = await Conversation.find({}); 
        res.status(200).json(conversations)

    }catch(err){
        res.json({error:err.message})
    }
};

const singleConversations = async(req,res)=>{
    const {firstContact,secondContact} = req.body;
    console.log(firstContact,secondContact);
    try{
        const conversation = await Conversation.findOne({firstContact,secondContact}); 
        if(conversation){
            return res.status(200).json(conversation);
        }
        const conversationReverse = await Conversation.findOne({firstContact:secondContact,secondContact:firstContact});
        if(conversationReverse){
            return res.status(200).json(conversationReverse);
        }
        res.status(404).json({error:'Conversation does not exist'})
        
    }catch(err){
        res.json({error:err.message})
    }
};

const create = async(req,res)=>{
    const {firstContact,secondContact} = req.body;
    try{
        const addFirstContact = await User.findByIdAndUpdate(firstContact,{$push : {contacts : secondContact}});
        if(!addFirstContact){
            return res.status(404).json({error:'Failed to add contact'})
        }
        const addSecondContact = await User.findByIdAndUpdate(secondContact,{$push : {contacts : firstContact}});
        if(!addSecondContact){
            return res.status(404).json({error:'Failed to add contact'})
        }
        const conversation = await Conversation.create({firstContact,secondContact});
        if(!conversation){
            return res.status(404).json({error:'Failed to create conversation'})
        } 
        res.status(200).json(conversation);
    }catch(err){
        res.json({error:err.message})
    }
}; 
const deleteConversation = async(req,res)=>{
    const {id} = req.params;
    try{
        const conversation = await Conversation.findByIdAndDelete(id);
        if(!conversation){
            return res.status(404).json({error:'Conversation does not exist'})
        } 
        res.status(200).json(conversation);
    }catch(err){
        res.json({error:err.message})
    }
}; 

module.exports = {allConversations,singleConversations,create,deleteConversation};

