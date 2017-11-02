// src/routes/index.js

'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Bill = require('../models/bill.model.js');

// GET
router.get('/bills', function (req, res, next) {
  Bill.find({}, function(err, bills) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    };
    res.json({bills: bills});
  });
}); 

// POST
router.post('/bills', function(req, res, next) {
  const bill = req.body;
  Bill.create(bill, function(err, bill) {
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    };
    res.json({'bill': bill, message: 'Bill Created'});
  });
});

// PUT
router.put('/bills/:id', function(req, res, next) {
  const id = req.params.id;
  const bill = req.body;
  if(bill && bill._id !== id) {
    return res.status(500).json({err: "Ids do not match"});
  };
  Bill.findByIdAndUpdate(id, bill, {new: true}, function(err, bill) {
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    };
    res.json({'bill': bill, message: 'Bill Updated'});
  });
});

// DELETE
router.delete('/bills/:id', function(req, res, next) {
  const id = req.params.id;
  const bill = req.body;

  Bill.findByIdAndRemove(id).exec().then(
    doc => {
      if(!doc) {
        return res.status(404).end();
      };
      return res.status(204).end();
    }
  );
});

module.exports = router;
