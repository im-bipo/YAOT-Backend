const express = require("express");

const connectToMongoDB = require("./connection");

//import routers
const eventRouter = require("./routes/event");

const app = express();

const PORT = 3000;

//databaseConnection
connectToMongoDB("mongodb://localhost:27017/CSIT_Assocation_OF_BMC_Database");

//middlewares
app.use(express.urlencoded({extended : true}))

//routes
app.use('/api/event',eventRouter)


app.listen(PORT, () => {
  console.log("server is running at port: ", PORT);
});
