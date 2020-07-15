const expenseBuilder = require('../controllers/expenseController');

module.exports = app => {
  app
    .route('/expenses')
    .get(expenseBuilder.list_all_expenses)
    .post(expenseBuilder.create_a_expense);

  app
    .route('/expenses/:expenseId')
    .get(expenseBuilder.read_a_expense)
    .put(expenseBuilder.update_a_expense)
    .delete(expenseBuilder.delete_a_expense);
};