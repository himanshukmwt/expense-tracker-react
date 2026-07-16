import { createContext, useContext, useReducer, useEffect } from 'react'

const ExpenseContext=createContext();

const savedData = localStorage.getItem('expenseData')

const initialState =savedData ? JSON.parse(savedData) : {
   entries: [
    { id: 1, type: 'income',  title: 'Salary',           amount: 85000, category: 'Salary',        date: '2026-06-01', notes: '' },
    { id: 2, type: 'expense', title: 'Swiggy order',      amount: 480,   category: 'Food',          date: '2026-06-06', notes: '' },
    { id: 3, type: 'expense', title: 'Uber ride',         amount: 220,   category: 'Transport',     date: '2026-06-05', notes: '' },
    { id: 4, type: 'expense', title: 'Electricity bill',  amount: 1840,  category: 'Bills',         date: '2026-06-03', notes: '' },
    { id: 5, type: 'expense', title: 'Amazon shopping',   amount: 3200,  category: 'Shopping',      date: '2026-05-20', notes: '' },
    { id: 6, type: 'expense', title: 'Gym membership',    amount: 2000,  category: 'Health',        date: '2026-05-15', notes: '' },
    { id: 7, type: 'expense', title: 'Netflix',           amount: 649,   category: 'Entertainment', date: '2026-04-10', notes: '' },
    { id: 8, type: 'expense', title: 'Books',             amount: 1200,  category: 'Education',     date: '2026-03-22', notes: '' },
    { id: 9, type: 'expense', title: 'Medicines',         amount: 850,   category: 'Health',        date: '2026-02-14', notes: '' },
    { id: 10, type: 'expense', title: 'Petrol',           amount: 1500,  category: 'Transport',     date: '2026-01-30', notes: '' },
  ],
  budgets: {
    Food: 15000,
    Transport: 8000,
    Shopping: 10000,
    Bills: 5000,
    Health: 5000,
    Entertainment: 4000,
    Education: 3000,
    Other: 2000,
  }
}

function expenseReducer(state, action) {
    switch(action.type){

        case 'ADD_ENTRY':
            return {
                ...state,
                entries : [action.payload, ...state.entries]
            }
        
        case 'DELETE_ENTRY':
            return{
                ...state,
                entries: state.entries.filter(e=>e.id!==action.payload)
            }

        case 'EDIT_ENTRY':
            return{
                ...state,
                entries:state.entries.map(e=>e.id==action.payload.id?action.payload :e)
            }    

        case 'UPDATE_BUDGET':
            return{
                ...state,
                budgets:{ ...state.budgets, ...action.payload}
            }

        case 'LOAD_DATA':
            return action.payload

        default:
            return state    
    }
}

export function ExpenseProvider({ children}){
    const[state, dispatch]=useReducer(expenseReducer, initialState)


      useEffect(() => {
    localStorage.setItem('expenseData', JSON.stringify(state))
  }, [state])

    const addEntry = (entry) => {
    dispatch({
      type: 'ADD_ENTRY',
      payload: { ...entry, id: Date.now() }
    })
  }

  const deleteEntry = (id) => {
    dispatch({ type: 'DELETE_ENTRY', payload: id })
  }

  const editEntry = (entry) => {
    dispatch({ type: 'EDIT_ENTRY', payload: entry })
  }

    const updateBudget = (budgets) => {
    dispatch({ type: 'UPDATE_BUDGET', payload: budgets })
  }

  const getSummary=(entries) => {
    const income=entries.filter(e=>e.type === 'income').reduce((sum,e)=>sum+e.amount,0)

     const expense = entries
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0)

      return {
      income,
      expense,
      balance: income - expense
    }
  }
   return(
    <ExpenseContext.Provider value={{
      entries: state.entries,
      budgets: state.budgets,
      addEntry,
      deleteEntry,
      editEntry,
      updateBudget,
      getSummary,
    }}>
      {children}
    </ExpenseContext.Provider>
   )
}

export function useExpense() {
  return useContext(ExpenseContext)
}
  