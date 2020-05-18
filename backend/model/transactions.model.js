const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Transaction = Schema({
  id: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  debit: {
    type: Number,
  },
  credit: {
    type: Number,
  },
  accountId: {
    type: Number,
  },
  date: { type: String },
});

Transaction.plugin(AutoIncrement, { id: "id_1", inc_field: "id" });
module.exports = mongoose.model("Transaction", Transaction);
