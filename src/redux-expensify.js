import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


const expensesDefaultState = []
const expensesReducer = (state = expensesDefaultState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      return state.filter(expense => expense.id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense
        }
      })
    default:
      return state
  }
}

const filtersDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}
const filtersReducer = (state = filtersDefaultState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}



// action generators
// ADD_ENPENSE
const addExpense = (
  {
    description =  '', 
    note =  '', 
    amount = 0,
    createdAt = 0
  } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate
})

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate
})

const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}))

// timestamps -> positive or negatine intergers(milleseconds)
// 起始的時間從 1970/01/01 00:00:00

// get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter(expense => {
    //是number的話, 走後面的邏輯, 不是number, 全部展示
    let startDateMatch = (typeof startDate !== 'number') || (expense.createdAt >= startDate)
    let endDateMatch = (typeof endDate !== 'number') || (expense.createdAt <= endDate)
    let textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) 
    return startDateMatch && endDateMatch && textMatch
  }).sort((a,b) => {
    if(sortBy === 'date') {
      return a.createdAt > b.createdAt ? -1 : 1
    } 
    if(sortBy === 'amount') {
      return a.amount > b.amount ? -1 : 1
    }
  })
}

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

// dispatch actions
const expenseOne = store.dispatch(addExpense({
  description: 'Rent', 
  amount: 2100, 
  createdAt: 1000, 
  note: 'Final payment for the address'}))
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 200, createdAt: 900}))

// store.dispatch(removeExpense({id: expenseOne.expense.id}))
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}))

// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount()) // amount
// store.dispatch(sortByDate()) // date

// store.dispatch(setStartDate(-2000)) //startDate 125
// store.dispatch(setStartDate()) // startDate undefined
// store.dispatch(setEndDate(1250)) // endDate 1250




const demoState = {
  expenses: [{
    id: '123456',
    description: 'Feb Rent',
    note: 'Final payment for the address',
    amount: 55400,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //amount or date
    startDate: undefined,
    endDate: undefined
  }
}



