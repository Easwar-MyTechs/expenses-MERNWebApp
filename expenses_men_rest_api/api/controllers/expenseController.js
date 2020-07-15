const mongoose = require('mongoose');
const expense = mongoose.model('expenses');

exports.list_all_expenses = (req, res) => {
  expense.find({}, (err, expenses) => {
    if (err) res.send(err);
    res.json(expenses);
  });
};

exports.create_a_expense = (req, res) => {
  const newexpense = new expense(req.body);
  newexpense.save((err, expense) => {
    if (err) res.send(err);
    res.json(expense);
  });
};

exports.read_a_expense = (req, res) => {
  expense.findById(req.params.expenseId, (err, expense) => {
    if (err) res.send(err);
    res.json(expense);
  });
};

exports.update_a_expense = (req, res) => {
  expense.findOneAndUpdate(
    { _id: req.params.expenseId },
    req.body,
    { new: true },
    (err, expense) => {
      if (err) res.send(err);
      res.json(expense);
    }
  );
};

exports.delete_a_expense = (req, res) => {
  expense.deleteOne({ _id: req.params.expenseId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'expense successfully deleted',
     _id: req.params.expenseId
    });
  });
};