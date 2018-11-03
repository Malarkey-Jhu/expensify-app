import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const result = removeExpense({id: '123abc'})
  expect(result).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should setup editExpense action object', () => {
  const result = editExpense('123abc', {description: 'Coffee'})
  expect(result).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      description: 'Coffee'
    }
  })
})

test('should setup addExpense action object', () => {
  const expenseData = {
    description: 'Rent',
    amount: 3000, 
    createdAt: 10000, 
    note: 'Last month Rent'
  }
  const result = addExpense(expenseData)
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
})

test('should setup addExpense Object with default value', () => {
  const result = addExpense()
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description : '', 
      note : '', 
      amount : 0,
      createdAt : 0
    }
  })
})