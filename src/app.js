import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses'
// import 'react-dates/initialize'
import 'normalize.css/normalize.css';
import './styles/style.scss'
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

// store.subscribe(() => {
//   const state = store.getState()
//   console.log(getVisibleExpenses(state.expenses, state.filters))
// })

store.dispatch(addExpense({description: 'Water bill', amount: 4500}))
store.dispatch(addExpense({description: 'Gas bill', createdAt: 1000}))
store.dispatch(addExpense({description: 'Rent', amount: 10900}))

// store.dispatch(setTextFilter('water'))

// setTimeout(() => {
//   store.dispatch(setTextFilter('bill'))
// }, 3000)

const jsx = (
  <Provider store={store}>
    <AppRouter/> 
  </Provider>
)

ReactDOM.render(
 jsx
,document.getElementById('root'))