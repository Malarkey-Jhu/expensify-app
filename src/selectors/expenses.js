// timestamps -> positive or negatine intergers(milleseconds)
// 起始的時間從 1970/01/01 00:00:00
import moment from 'moment';

// get visible expenses
export default (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter(expense => {
    //startDate不存在的話, 全部展示, 相當於沒有filter, 存在的話用moment比較日期方法
    const createdAtMoment = moment(expense.createdAt)
    let startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
    let endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
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