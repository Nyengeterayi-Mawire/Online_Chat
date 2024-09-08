const User = require('../schemas/users'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = async(req,res) => {
    const {firstname,lastname,username,email,password,avatar,contacts} = req.body;
    try{
        const validUsername =  await User.findOne({username}); 
        if(validUsername){
            return res.status(404).json({error:'Username already exists'})
        }
        // const genSalt = bcrypt.genSalt(process.env.SALT)
        const hash = await bcrypt.hash(password,12)
        if(!hash){
            return res.status(404).josn({error:'Error with password'})
        }
        const user =  await User.create({firstname,lastname,username,email,password : hash,avatar,contacts}); 
        if(!user){
            return res.status(404).json({error:'failed to register account'})
        }
        res.status(200).json(user)
    }catch(err){
        res.json({error:err.message})
    }
}

const login = async(req,res) => {
    const {username,password} = req.body; 
    try{
        const validUsername = await User.findOne({username});
        if(!validUsername){
            return res.status(404).json({error:'Incorrect username'});
        } 
        const validPassword = await bcrypt.compare(password,validUsername.password);
        if(!validPassword){
            return res.status(404).json({error:'Incorrect password'});
        } 
        const token = await jwt.sign({userID:validUsername._id},process.env.SECRET_KEY,{'expiresIn' : '1h'}); 
        if(!token){
            return res.status(404).json({error:'failed to create token'})
        }
        res.status(200).json({user: validUsername,token})
    }catch(err){
        res.json({error:err.message})
    }
}

const singleUser = async(req,res) => {
    const {id} = req.params;
    try{
        const user = await User.findById(id); 
        if(!user){
            return res.status(404).json({error:'User does not exist'});
        }
        res.status(200).json(user);
    }catch(err){
        res.json({error:err.message})
    }
}

const allUsers = async(req,res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch(err){
        res.json({error:err.message})
    }
} 

const deleteUser = async(req,res) => {
    const {id} = req.params;
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({error:'User does not exist'})
        }
        res.status(200).json(user);
    }catch(err){
        res.json({error:err.message})
    }
} 

const updateUser = async(req,res) => {
    const {id} = req.params;
    const data = req.body;
    console.log(req.file);
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error:'Could not find user'})
        }
        if(!req.file){
            // return res.status(404).json({error:'No image to upload'})
            if(data.password){
                const hash = await bcrypt.hash(data.password,12);
                const updateUser = await User.findByIdAndUpdate(id,{...data,password:hash},{new:true}); 
                if(!updateUser){
                    return res.status(404).json({error:'could not update user'})
                } 
                return res.status(200).json(updateUser)
            }else{
                const updateUser = await User.findByIdAndUpdate(id,data,{new:true}); 
                if(!updateUser){
                    return res.status(404).json({error:'could not update user'})
                } 
                return res.status(200).json(updateUser)
            }
            
        }
        if(data.password){
            const hash = await bcrypt.hash(data.password,12);
            const updateAvatar = await User.findByIdAndUpdate(id,{...data,avatar : req.file.filename,password:hash},{new:true});
            if(!updateAvatar){
                return res.status(404).json({error:'Failed  to  update avatar'})
            }        
            return res.status(200).json(updateAvatar);
        }else{
            const updateAvatar = await User.findByIdAndUpdate(id,{...data,avatar : req.file.filename},{new:true});
            if(!updateAvatar){
                return res.status(404).json({error:'Failed  to  update avatar'})
            }        
            return res.status(200).json(updateAvatar);
        }
        
    }catch(err){
        res.json({error:err.message})
    }
} 

const search = async(req,res) => {
    const {searchValue} = req.body
    try{
        const users = await User.find({username:{ $regex: searchValue, $options: 'i' }}); 
        res.status(200).json(users)
    }catch(err){
        res.json({error:err.message});
    }
}
module.exports = {register,login,singleUser,allUsers,deleteUser,updateUser,search};
