import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { TiDelete } from 'react-icons/ti';

const ExpenseItem = (props) => {
  const { dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch({
      type: 'DELETE_EXPENSE',
      payload: props.id,
    });
  };

  const increaseAllocation = (name) => {
    const expense = {
      name: name,
      cost: 10,
    };

    console.log('new expense, increaseAllocation:', expense);

    dispatch({
      type: 'ADD_EXPENSES',
      payload: expense,
    });
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.cost}</td>
      <td>
        <button onClick={(e) => increaseAllocation(props.name)}>Add</button>
      </td>
      <td>
        <TiDelete size='3em' onClick={handleDeleteExpense}></TiDelete>
      </td>
    </tr>
  );
};

export default ExpenseItem;
