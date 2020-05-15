const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.Port || 3001;

const mongoose = require("mongoose");

//database connection
mongoose.connect("mongodb://localhost:27017/bankDB", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () =>
  console.log("mongoDB connection eastablished succesfully")
);

//middleware
app.use(express.json());
app.use(cors());

//routes
const accounts = require("./route/accounts");
app.use("/accounts", accounts);
const transactions = require("./route/transactions");
app.use("/transactions", transactions);

//acknoledge api
app.get("/", (req, res) =>
  res.json({ message: "Welcome you are in the main page :)" })
);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`your app is running on port ${PORT} enjoy developing`)
);
