import React, {Component} from 'react';
import moment from 'moment';
// import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


// const now = moment();
// console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calenderFocused: false,
      error: null
    }
  }

  onDescriptionChange = (e) => {
    this.setState({description: e.target.value})
  }

  onAmountChange = (e) => {
    const amount = e.target.value
    // string.match
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/g)) {
    this.setState(() => ({amount}))
    }
  }

  onNoteChange = (e) => {
    this.setState({note: e.target.value})
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}))
    }
  }

  onFocusChange = ({focused}) => {
    this.setState(() => ({calenderFocused: focused}))
  }

  onSubmit = (e) => {

    e.preventDefault()
    if (!this.state.description || !this.state.amount) {
      // set error state
      this.setState(() => ({error: 'Please provide description and amount'}))
    } else {
      // clear error state
      // submit the form
      this.setState(() => ({error: null}))
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(), //轉成時間戳，moment的方法
        note: this.state.note
      })
    }

  }

  render() {
    return (
      <div>
      { this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.onSubmit}>
        <input
        type="text"
        onChange={this.onDescriptionChange} 
        value={this.state.description}
        placeholder="description"/>

        <input 
        type="number"
        value={this.state.amount}
        onChange={this.onAmountChange}
        placeholder="Amount"/>

        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calenderFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={(day) => false}
          
        />

        <textarea
        value={this.state.note} 
        onChange={this.onNoteChange}
        placeholder="note"/>
        <button>Add Expense</button>
      </form>
      </div>
    )
  }
}