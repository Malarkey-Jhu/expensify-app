import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListFilter from './ExpenseListFilter';

const ExpenseList = (props) => (
  <div>
    <h1>ExpenseList</h1>
    <ExpenseListFilter/>
    {
      props.expenses.map((expense) => {
        return (
          <ExpenseListItem key={expense.id} {...expense}/>)
      })
    }
  </div>
)

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList)