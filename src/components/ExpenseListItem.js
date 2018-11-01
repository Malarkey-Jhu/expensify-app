import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = (props) => {

  console.log(props)
  return (
    <div>
      <ul>
        <li>Description: {props.description}</li>
        <li>Amout: {props.amount}</li>
        <li>Created At: {props.createdAt}</li>
        <button onClick={()=> {
          props.dispatch(removeExpense({id: props.id}))
        }}>Delete</button>
      </ul>
    </div>
  )
}

export default connect()(ExpenseListItem);
