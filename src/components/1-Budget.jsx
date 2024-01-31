import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

function Budget() {
  // consume budget and dispatch from AppContext
  const { budget, dispatch } = useContext(AppContext);

  // define local state variable
  const [newBudget, setNewBudget] = useState(budget);

  const handleBudgetChange = (e) => {
    const newBudgetValue = e.target.value;
    setNewBudget(newBudgetValue);
    dispatch({ type: 'SET_BUDGET', payload: newBudgetValue });
    console.log(newBudgetValue);
    console.log(newBudget);
  };

  // renmder JSX
  return (
    <div className='alert alert-secondary'>
      Budget: RM {newBudget}
      <span className='ml-2'>
        <input
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
