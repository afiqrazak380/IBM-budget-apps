import React from 'react';
import { AppProvider } from './context/AppContext';

import Budget from './components/1-Budget';
import Remaining from './components/2-Remaining';
import ExpenseTotal from './components/3-ExpenseTotal';
import ExpenseList from './components/5-ExpenseList';

const App = () => {
  return (
    <>
      <div className='container text-center'>
        <h1 className='alert alert-primary mt-4'>Budget Allocation</h1>
        <AppProvider>
          <div>
            <Budget />
            <Remaining />
            <ExpenseTotal />
            <ExpenseList />
          </div>
        </AppProvider>
      </div>
    </>
  );
};

export default App;
