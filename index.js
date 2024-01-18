const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const connectToMongoDB = require("./connection");

//import routers
const eventRouter = require("./routes/event");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
dotenv.config();

const { PORT, DB_URL } = process.env;

//databaseConnection
connectToMongoDB(DB_URL);

//middlewares
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //serve static files

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/event", eventRouter);

//error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running at port: ", PORT);
});
