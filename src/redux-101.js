import { createStore } from 'redux';

// action generators -> function that return objects / actions 

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

const setCount = ({count} = {}) => ({
  type: 'SET',
  count
})

const resetCount = () => ({
  type: 'RESET'
})

// reducers : 操作store , base on state and action
// 1. reducers are pure functions
// 2. never change state or actions, never mutate the state directly

const reducer = (state = {count: 0}, action) => {
  // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
  // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
  switch(action.type) {
    case 'INCREMENT': 
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
    case 'SET': 
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default: 
      return state
  }
}

//create store 接受一個函數(reducer)當參數，並返回一個 state
const store = createStore(reducer)

// 訂閱監聽事件, 監聽store的改動, 參數是一函數, 放要store改動後要做的事
// 返回的是取消訂閱的函數, 執行則取消監聽
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

//Action -- dispatch an action
// an action is an obj sent to store
store.dispatch(incrementCount({incrementBy: 5}))
store.dispatch(incrementCount())
store.dispatch(resetCount())

// unsubscribe()

store.dispatch(decrementCount({decrementBy: 5}))
store.dispatch(decrementCount())
store.dispatch(setCount({count: 120}))


const coffee = ['Coffee(Hot)', '$3', '$2.5', '$2']

const [item,,Mcost] = coffee

console.log(`A medium ${item} cost ${Mcost}`)

// Array.prototype.reduce = function(fn, initialVal) {
//   let counter, acc;
//   if(!initialVal) {
//     acc = this[0]
//     counter = 1
//   }else {
//     acc = initialVal
//     counter = 0
//   }

//   while(counter < this.length) {
//     acc = fn(acc,this[counter])
//     counter++
//   }
  
//   return acc
// }

// [1,2,3,4].reduce((acc, curr) => {
//   return acc + curr
// },0)

// [[2],[1]]
// Array.prototype.concatAll = function() {
//   const result = []
//   this.forEach(subArr => {
//     result.push(...subArr)
//   })
//   return result
// }

// Array.prototype.map = function(fn) {
//   const result = []
//   this.forEach(item => {
//     result.push(fn(item))
//   })
//   return result
// }

// Array.prototype.filter = function(fn) {
//   const result = []

//   this.forEach(item => {
//     if(fn(item)) {
//       result.push(item)
//     }
//   })

//   return result
// }

