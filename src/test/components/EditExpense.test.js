import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpense';
import expenses from '../fixtures/expenses'
import { wrap } from 'module';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn()
  removeExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(<EditExpensePage history={history} editExpense={editExpense} removeExpense={removeExpense} expense={expenses[1]}/>)
})

// should render EditExpense
// snapshot

test('should render EditExpense correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

// should handle editExpense
// spies

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
  expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1])
  expect(history.push).toHaveBeenLastCalledWith('/')  
})

// should handle removeExpense
// spies

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click')
  expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[1].id})
  expect(history.push).toHaveBeenLastCalledWith('/')  
})
