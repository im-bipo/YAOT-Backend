const express = require("express");
const dotenv = require("dotenv");
const path = require('path')

const connectToMongoDB = require("./connection");

//import routers
const eventRouter = require("./routes/event");

const app = express();
dotenv.config();

const { PORT, DB_URL } = process.env;

//databaseConnection 
connectToMongoDB(DB_URL);

//middlewares
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//routes
app.use("/api/event",eventRouter); 

app.use((err, req, res, next) => {
  console.log("hi im error handler", err);
  return res.json({ mag: "error occure", err: err });
});

app.listen(PORT, () => {
  console.log("server is running at port: ", PORT);
});
