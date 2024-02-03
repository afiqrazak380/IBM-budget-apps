import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = () => {
  const { dispatch, remaining, currency } = useContext(AppContext);

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [action, setAction] = useState('');

  const handleSumbit = () => {
    if (cost > remaining) {
      alert(
        `The value cannot exceed the remaining funds: ${currency}${remaining}`
      );
      setCost('');
      return;
    }

    const expense = {
      name: name,
      cost: parseFloat(cost),
    };

    if (action === 'Reduce') {
      dispatch({
        type: 'REDUCE_EXPENSE',
        payload: expense,
      });
    } else {
      dispatch({
        type: 'ADD_EXPENSES',
        payload: expense,
      });
    }

    // Reset the form after submission
    setName('');
    setCost('');
    setAction('Add');

    // Check for input
    console.log('After Dispatch:', { name, cost, action, remaining });
  };

  return (
    <div>
      <h5 className='alert alert-secondary'>Allocation Form</h5>
      <div className='row'>
        <div className='col'>
          <div>
            <h6 htmlFor='inputGroupSelect01'>Department</h6>
          </div>
          <select
            className='custom-select'
            id=''
            onChange={(e) => setName(e.target.value)}
          >
            <option defaultValue='choose'>Choose:</option>
            <option value='Marketing'>Marketing</option>
            <option value='Sales' name='sales'>
              Sales
            </option>
            <option value='Finance' name='finance'>
              Finance
            </option>
            <option value='Human Resource' name='Human Resource'>
              HR
            </option>
            <option value='IT' name='it'>
              IT
            </option>
            <option value='Admin' name='admin'>
              Admin
            </option>
          </select>
        </div>
        <div className='col'>
          <div>
            <h6 htmlFor='inputGroupSelect02'>Allocation</h6>
            <div>
              <select
                name=''
                id=''
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                }}
              >
                <option defaultValue='choose'>Choose:</option>
                <option value='Add' name='add'>
                  Add
                </option>
                <option value='Reduce' name='reduce'>
                  Reduce
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className=''>
            <span className='ml-4'>{currency}</span>
            <input
              type='number'
              required
              id='cost'
              value={cost}
              placeholder='Allocation Cost Here'
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCost(isNaN(value) ? '' : value);
              }}
            />
            <button
              className='btn btn-primary'
              onClick={handleSumbit}
              style={{ margin: '1rem' }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationForm;
