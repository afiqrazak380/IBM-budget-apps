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
      const updatedExpense = state.expenses.map((currentExpense) => {
        if (currentExpense.name === action.payload.name) {
          const newCost = currentExpense.cost + action.payload.cost;

          if (state.budget >= newCost) {
            // Update the expense cost only if it doesnt exceed the budget
            return { ...currentExpense, cost: newCost };
          } else {
            alert('Out of funds!!');
            return currentExpense;
          }
        }
        return currentExpense;
      });
      return {
        ...state,
        expenses: updatedExpense,
      };

    // #2
    case 'REDUCE_EXPENSE':
      console.log('Reducing expense:', action.payload);

      // Destructuring action.payload object
      const { name, cost } = action.payload;

      // Find the expense to reduce
      const reducedExpenseIndex = state.expenses.findIndex(
        (expense) => expense.name === name && expense.cost >= cost
      );

      if (reducedExpenseIndex !== -1) {
        // Create a copy of expenses array to modify
        const updatedExpenses = [...state.expenses];

        //Update the expense and calculate new budget
        updatedExpenses[reducedExpenseIndex] = {
          ...updatedExpenses[reducedExpenseIndex],
          cost: updatedExpenses[reducedExpenseIndex].cost - cost,
        };

        const updatedBudget = state.budget + cost;

        // Retrun the updated state
        return {
          ...state,
          expenses: updatedExpenses,
          budget: updatedBudget,
        };
      }

      console.error(`Unable to reduce expense form ${name} with cost ${cost}`);
      return state;

    case 'DELETE_EXPENSE':
      const updatedExpenses = state.expenses.map((currentExpense) => {
        if (currentExpense.name === action.payload) {
          // Increment budget by the cost of the deleted expense
          state.budget += currentExpense.cost;
          // Reset the cost of the deleted expense to 0
          return { ...currentExpense, cost: 0 };
        }
        return currentExpense;
      });
      return {
        ...state,
        expenses: updatedExpenses,
      };

    // #4
    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload,
      };

    // #5
    case 'CHG_CURRENCY':
      return {
        ...state,
        currency: action.payload,
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
