const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const SECURITY_KEY = process.env.SECURITY_KEY

const setUser = (user) =>{
const token = jwt.sign(user,SECURITY_KEY)
return(token)
}

const getUser = () =>{

}

module.exports = {setUser,getUser}