'use strict';

// load mongoose
const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    due: Date,
    isPayed: Boolean,
    created_at: { type: Date, default: Date.now }
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;