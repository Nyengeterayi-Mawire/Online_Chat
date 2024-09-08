const mongoose = require('mongoose'); 

const schema = mongoose.Schema; 

const userSchema = new schema({
    firstname : {
        type : String,
        require : true 
    },
    lastname : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    avatar : {
        type : String,
        require : true
    },
    contacts : {
        type : Array,
        require : true
    },
})

module.exports = mongoose.model('Users',userSchema); 