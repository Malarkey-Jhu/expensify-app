import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = (props) => {
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          const id = props.match.params.id
          const updates = expense
          props.dispatch(editExpense(id, updates))
          props.history.push('/')
        }}
      >
      </ExpenseForm>
      <button onClick={()=> {
        props.dispatch(removeExpense({id: props.expense.id}))
        props.history.push('/')
      }}>Delete</button>
    </div>
)}
 

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => expense.id === props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditExpensePage);