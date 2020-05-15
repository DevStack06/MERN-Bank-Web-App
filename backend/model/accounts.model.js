const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Accounts = Schema({
  id: {
    type: Number,
    default: -1,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: String,
    required: true,
  },
  password: {
    type: String,

    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
});

Accounts.plugin(AutoIncrement, { id: "id", inc_field: "id" });
module.exports = mongoose.model("Accounts", Accounts);
