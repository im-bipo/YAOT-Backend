const express = require("express");
const dotenv = require('dotenv') 

const connectToMongoDB = require("./connection"); 

//import routers
const eventRouter = require("./routes/event");

const app = express();
dotenv.config()

const {PORT,DB_URL} = process.env;

//databaseConnection
connectToMongoDB(DB_URL);  

//middlewares
app.use(express.urlencoded({extended : true}))
//routes
app.use('/api/event',eventRouter)


app.use((err,req,res,next) =>{
  console.log('hi im error handler');
  return res.json({mag : 'error occure',err : err})
})

app.listen(PORT, () => {
  console.log("server is running at port: ", PORT);
});
