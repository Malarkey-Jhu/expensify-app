import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilter } from '../../components/ExpenseListFilter';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate, wrapper;
beforeEach(() => {
  setTextFilter = jest.fn()
  sortByAmount = jest.fn()
  sortByDate = jest.fn()
  setStartDate = jest.fn()
  setTextFilter = jest.fn()
  setEndDate = jest.fn()
  wrapper = shallow(
  <ExpenseListFilter
    filters={filters} 
    setTextFilter={setTextFilter}
    sortByAmount={sortByAmount}
    sortByDate={sortByDate}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
  />)
})

test('should render ExpenseListFilter correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilter with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
  const value = 'some text'
  wrapper.find('input').simulate('change', {
    target: { value }
  })
  expect(setTextFilter).toHaveBeenCalledWith(value)
})

test('should sort by date', () => {
  const value = 'date'
  wrapper.setProps({
   filters: altFilters 
  })
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByAmount).toHaveBeenCalled()
})

test('should handle date changes', () => {
  const value = {
    startDate: moment(0),
    endDate: moment(0).add(4, 'days')
  }
  wrapper.find('DateRangePicker').prop('onDatesChange')(value)
  expect(setStartDate).toHaveBeenCalledWith(value.startDate)
  expect(setEndDate).toHaveBeenCalledWith(value.endDate)
})

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})