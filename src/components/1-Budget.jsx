import React, { createContext, useReducer } from 'react';

// 1. Sets the initial state when apps loads
const initialState = {
  budget: 2000,
  expenses: [
    { id: 'Marketing', name: 'Marketing', cost: 50 },
    { id: 'Finance', name: 'Finance', cost: 300 },
    { id: 'Sales', name: 'Sales', cost: 70 },
    { id: 'Human Resource', name: 'Human Resource', cost: 40 },
    { id: 'IT', name: 'IT', cost: 500 },
  ],
  currency: '£',
};

// 2. Create context
export const AppContext = createContext();

// 3. Provider component
export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  let remaining = 0;

  // calculate the remaining budget based on total expenses
  if (state.expenses) {
    const totalExpenses = state.expenses.reduce((total, item) => {
      return (total += item.cost);
    }, 0);
  }
};
