import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
  const { expenses, currency } = useContext(AppContext);

  const totalExpenses = expenses.reduce((acc, item) => {
    return (acc += item.cost);
  }, 0);

  return (
    <div className='alert alert-primary'>
      <span>
        Expense Total: {currency} {totalExpenses}
      </span>
    </div>
  );
};

export default ExpenseTotal;
