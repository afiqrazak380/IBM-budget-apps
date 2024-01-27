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

// 6. The reducer
export const AppReducer = (state, action) => {
  let budget = 0;
  switch (action.type) {
    // #1
    case 'ADD_EXPENSES':
      let totalBudget = 0;

      totalBudget = state.expenses.reduce((total, item) => {
        return (total += item.cost);
      }, 0);

      totalBudget = totalBudget + action.payload.cost;

      console.log(`total_budget: ${totalBudget}`);
      console.log(`state_budget: ${state.budget}`);

      if (totalBudget <= state.budget) {
        totalBudget = 0;

        state.expenses.map((currentExpense) => {
          if (currentExpense.name === action.payload.name) {
            currentExpense.cost = action.payload.cost + currentExpense.cost;
          }
          return currentExpense;
        });
        return {
          ...state,
        };
      } else {
        alert('Out of funds!!');
        return {
          ...state,
        };
      }

    // #2
    case 'REDUCE_EXPENSE':
      const reduceExpense = state.expenses.map((currentExpense) => {
        if (
          currentExpense.name === action.payload.name &&
          currentExpense.cost - action.payload.cost >= 0
        ) {
          currentExpense.cost = currentExpense.cost - action.payload.cost;
          budget = state.budget + action.payload.cost;
        }
        return currentExpense;
      });
      return {
        ...state,
        expenses: [...reduceExpense],
      };

    // #3
    case 'DELETE_EXPENSE':
      state.expenses.map((currentExpense) => {
        if (currentExpense.name === action.payload) {
          budget = state.budget + currentExpense.cost;
          currentExpense.cost = 0;
        }
        return currentExpense;
      });
      return {
        ...state,
        budget,
      };

    // #4
    case 'SET_BUDGET':
      state.budget = action.payload;
      return {
        ...state,
      };

    // #5
    case 'CHG_CURRENCY':
      state.currency = action.payload;
      return {
        ...state,
      };

    // #6
    default:
      return state;
  }
};

// 3. Provider component
export const AppProvider = (props) => {
  // 4. Set up the app state using useReducer
  const [state, dispatch] = useReducer(AppReducer, initialState);

  let remaining = 0;

  // calculate the remaining budget based on total expenses
  if (state.expenses) {
    const totalExpenses = state.expenses.reduce((total, item) => {
      return (total += item.cost);
    }, 0);
    remaining = state.budget - totalExpenses;
  }

  return (
    // 5. Provide the app state and necessary function to its children througn context
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        currency: state.currency,
        remaining: remaining,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
