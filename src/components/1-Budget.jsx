import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

function Budget() {
  // consume budget and dispatch from AppContext
  const { budget, dispatch, currency, expenses } = useContext(AppContext);

  // define local state variable
  const [newBudget, setNewBudget] = useState(budget);

  const handleBudgetChange = (e) => {
    const newBudgetValue = e.target.value;
    if (newBudgetValue <= 20000) {
      setNewBudget(newBudgetValue);
      dispatch({ type: 'SET_BUDGET', payload: newBudgetValue });
    } else {
      alert(`The amount must not exceed ${currency}20,000`);
    }

    if (newBudgetValue < expenses) {
      alert(`You cannot reduce the budget value lower than spending`);
    }
  };

  // render JSX
  return (
    <div className='alert alert-secondary'>
      Budget: {currency}
      <span className='ml-2'>
        <input
          placeholder='Insert Amount'
          type='number'
          step='10'
          value={newBudget}
          onChange={handleBudgetChange}
        />
      </span>
    </div>
  );
}

export default Budget;
