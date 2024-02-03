import React from 'react';
import { AppProvider } from './context/AppContext';

import Budget from './components/1-Budget';
import Remaining from './components/2-Remaining';
import ExpenseTotal from './components/3-ExpenseTotal';
import ExpenseList from './components/5-ExpenseList';
import AllocationForm from './components/6-AllocationForm';
import CurrencyChange from './components/7-Currency';

const App = () => {
  return (
    <>
      <div className='container text-center'>
        <h1 className='alert alert-primary mt-4'>
          Company's Budget Allocation
        </h1>
        <AppProvider>
          <div>
            <div className='row'>
              <div className='col'>
                <Budget />
              </div>
              <div className='col'>
                <Remaining />
              </div>
              <div className='col'>
                <ExpenseTotal />
              </div>
            </div>
            <ExpenseList />
            <AllocationForm />
            <CurrencyChange />
          </div>
        </AppProvider>
      </div>
    </>
  );
};

export default App;
