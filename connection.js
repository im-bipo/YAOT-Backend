const mongoose = require('mongoose')

const connectToMongoDB = (url) =>{
    mongoose.connect(url).then(()=>{
        console.log('Database connected');
    })
}

module.exports = connectToMongoDB