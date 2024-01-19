const { getUser } = require("../services/Auth")

const handelingAuthoritiesForUses = (req,res,next) =>{
    //handle auth    
    next()
}

module.exports = handelingAuthoritiesForUses