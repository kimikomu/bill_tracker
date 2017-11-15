'use strict';

const mongoose = require('mongoose');

// Bill model
const BillSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    due: { type: Date, default: Date.now },
    payed: Boolean,
    edited: {
      type: Boolean,
      default: false
    },
    created_at: { type: Date, default: Date.now }
});
const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;

// On startup, seed database if empty
Bill.count({}, function(err, count) {
    if(err) {
      throw err;
    }
    if(count > 0) return;
    
    const bills = require('./bill.seed.json');
    Bill.create(bills, function(err, newBills) {
      if(err) {
        throw err;
      }
      console.log("DB seeded")
    });
  });