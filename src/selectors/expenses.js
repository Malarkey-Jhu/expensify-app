// timestamps -> positive or negatine intergers(milleseconds)
// 起始的時間從 1970/01/01 00:00:00

// get visible expenses
export default (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter(expense => {
    //是number的話, 走後面的邏輯, 不是number, 全部展示
    let startDateMatch = (typeof startDate !== 'number') || (expense.createdAt >= startDate)
    let endDateMatch = (typeof endDate !== 'number') || (expense.createdAt <= endDate)
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