const express = require("express");
const PORT = 3001;
const app = express();

const mongoose = require("mongoose");

//database connection
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () =>
  console.log("mongoDB connection eastablished succesfully")
);

app.route("/").get((req, res) => {
  res.json("Welcome you are in the route page :)");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server started at port ${PORT}`);
});
