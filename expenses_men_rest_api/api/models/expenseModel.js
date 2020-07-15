const mongoose = require('mongoose');

const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    date: {
      type: Date,
      required: 'Date cannot be blank'
    },
    description: {
      type: String,
      required: 'description cannot be blank'
    },
    expenseType: {
        type: String,
        required: 'expenseType cannot be blank'
    },
    amount: {
        type: Number,
        required: 'amount should be greater than 0'
    },
  },
  { collection: 'expenses' }
);

module.exports = mongoose.model('expenses', expenseSchema);