import React, { createContext, useReducer } from 'react';

// Reducer - is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let new_expenses =[];
    switch (action.type) {
        case 'ADD_QUANTITY' :
            // eslint-disable-next-line
            let updatedqty = false;
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name) {
                expense.quantity = expense.quantity + action.payload.quantity;
                updatedqty = true;
                }
                new_expenses.push(expense);
                return true;
            }) 
            state.expenses = new_expenses;
            action.type = 'DONE';
            return {
                ...state,
            };
            
        case 'RED_QUANTITY':
            state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity = expense.quantity - action.payload.quantity;
                }
                expense.quantity = expense.quantity < 0 ? 0: expense.quantity;
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = 'DONE';
            return {
                ...state,
            };
        
        case 'DELETE_ITEM':
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name) {
                    expense.quantity = 0;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = 'DONE';
            return {
                ...state,
            };

        case 'CHG_LOCATION':
            action.type ='DONE';
            state.Location = action.payload;
            return {
                ...state,
            }

           default:
            return state;
    }
};

// Sets initial state when the app loads
const initialState = {
    expenses: [
        { id: "Shirt", name: 'Shirt', quantity: 0, unitprice: 500 },
        { id: "Jeans", name: 'Jeans', quantity: 0, unitprice: 300 },
        { id: "Dress", name: 'Dress', quantity: 0, unitprice: 400 },
        { id: "Dinner set", name: 'Dinner set', quantity: 0, unitprice: 600 },
        { id: "Bags", name: 'Bags', quantity: 0, unitprice: 200 },
    ],
    Location: '£'
};

// creates the context, this is where components import and use to get the state
export const AppContext = createContext();

// provider component - wraps the components we want to give access to the state
// accepts the children which are the nested components
export const AppProvider = (props) => {
    // set up the app state. takes a reducer, and initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total,item) => {
        return (total = total +(item.unitprice*item.quantity));
    }, 0);

    state.CartValue = totalExpenses;

    return (
        <AppContext.Provider
        value = {{
            expenses: state.expenses,
            CartValue: state.CartValue,
            dispatch,
            Location: state.Location
        }}
        >
            {props.children}
        </AppContext.Provider>
    );
};