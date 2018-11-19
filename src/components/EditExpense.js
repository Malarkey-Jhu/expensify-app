import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

// refactor to class base component
// setUp mapDispatchToProps editExpense and removeExpense

export class EditExpensePage extends React.Component {
 
  onhandleSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense)
    this.props.history.push('/')
  }

  onhandleClick = () => {
    const expense = {id: this.props.expense.id}
    this.props.removeExpense(expense)
    this.props.history.push('/')
  }

  render() {
    return (
    <div>
      <ExpenseForm
        expense={this.props.expense}
        onSubmit={this.onhandleSubmit}
      />
      <button onClick={this.onhandleClick}>Delete</button>
    </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
})
    
const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, updates) => dispatch(editExpense(id, updates)),
  removeExpense: (expense) => dispatch(removeExpense(expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);