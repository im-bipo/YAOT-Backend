const multer = require('multer')

const storage = multer.diskStorage({
  destination : (req,file,cb)=>{
   return cb(null,'./uploads/images/eventThumbnails')
  },
  filename : (req,file,cb)=>{
    fName = Date.now()+file.originalname
    return cb(null,fName)
  }
})

const uploadEventThumbnail = multer({storage})

module.exports = uploadEventThumbnail