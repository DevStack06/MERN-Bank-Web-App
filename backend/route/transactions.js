const Transactions = require("../model/transactions.model");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// let ObjectId = mongoose.Types.ObjectId;
router.route("/").get(async (req, res) => {
  await Transactions.find({}, (err, transactions) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.json(transactions);
    }
  });
});
router.route("/:id").get(async (req, res) => {
  console.log(req.params.id);
  await Transactions.find({ accountId: req.params.id }, (err, transaction) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.json(transaction);
    }
  });
});

//getting a single post of single user
router.route("/").post(async (req, res) => {
  // console.log(req.body);
  const transactions = Transactions({
    description: req.body.description,
    debit: req.body.debit,
    credit: req.body.credit,
    accountId: req.body.accountId,
    date: Date(),
  });

  transactions
    .save()
    .then(
      () => res.json({ message: "ok", data: transactions }),
      console.log(transactions)
    )
    .catch((err) => res.status(400).json({ Error: err }));
});

module.exports = router;
