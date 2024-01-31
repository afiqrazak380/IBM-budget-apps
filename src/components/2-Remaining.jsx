import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((acc, item) => {
    return (acc += item.cost);
  }, 0);

  console.log(totalExpenses);

  const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: RM {budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
