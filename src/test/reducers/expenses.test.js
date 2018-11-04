import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

// should remove expense 
test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]])
})

// should not remove expense if id not found
test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

// should add an expense
test('should add an expense', () => {
  const expense = {
    description: 'Coffee',
    amount: 1000,
    createdAt: 0
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }

  const state = expensesReducer(expenses, action)
  expect(state).toEqual([...expenses, expense])
})

// should edit an expense
test('should edit an expense', () => {
  const amount = 120000
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      amount
    }
  }

  const state = expensesReducer(expenses, action)
  expect(state[0].amount).toBe(120000)
})


// should not edit an expense if id not found
test('should edit an expense', () => {
  const amount = 120000
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      amount
    }
  }

  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

