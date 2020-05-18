const Accounts = require("../model/accounts.model");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = mongoose.Types.ObjectId;
router.route("/").get(async (req, res) => {
  await Accounts.find({}, (err, accounts) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.json(accounts);
    }
  });
});

router.route("/:id").patch(async (req, res) => {
  // await Accounts.findOneAndUpdate({id:req.params.id}, (err, accounts) => {
  //   if (err) {
  //     res.status(400).json({ error: err });
  //   } else {
  //     res.json(accounts);
  //   }
  // });

  await Accounts.update(
    { id: req.params.id },
    { balance: req.body.balance },
    (err, post) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "ok",
      };
      return res.status(200).send(response);
    }
  );
});

//getting a single post of single user
router.route("/").post(async (req, res) => {
  // console.log(req.body);
  const accounts = Accounts({
    name: req.body.name,
    balance: req.body.balance,
    password: req.body.password,
    accountType: req.body.accountType,
  });

  accounts
    .save()
    .then(
      () => res.json({ message: "ok", data: accounts }),
      console.log(accounts)
    )
    .catch((err) => res.status(400).json({ Error: err }));
});

module.exports = router;
