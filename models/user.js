const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user','General Member','Excutive Member','Senior Excutive','Admin'],
        default :"user"
    },
    profilePicture : {
        type : String,
        default : 'uploads/images/profilePicture/defaultProfilePicture.jpg'
    }
},{timestamps : true})

const USER = mongoose.model('users',userSchema)

module.exports = USER