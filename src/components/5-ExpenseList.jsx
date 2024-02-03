import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ExpenseItem from './4-ExpenseItem';

const ExpenseList = () => {
  const { expenses } = useContext(AppContext);

  return (
    <>
      <div className='alert alert-warning'>Expense List</div>
      <table className='table table-bordered'>
        {/* header */}
        <thead className='table-dark'>
          <tr>
            <th scope='col'>Department</th>
            <th scope='col'>Allocated Budget</th>
            <th scope='col'>Increase by 10</th>
            <th scope='col'>Decrese by 10</th>
          </tr>
        </thead>

        {/* body */}
        <tbody>
          {expenses.map((expense) => {
            return (
              <ExpenseItem
                id={expense.id}
                key={expense.id}
                name={expense.name}
                cost={expense.cost}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ExpenseList;
