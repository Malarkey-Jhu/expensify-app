import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ExpensifyDashboardPage from '../components/Dashboard';
import AddExpensePage from '../components/AddExpense'
import EditExpensePage from '../components/EditExpense';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
  <BrowserRouter>
  <div>
    <Header/>
    <Switch>
      <Route path="/" component={ExpensifyDashboardPage} exact={true}/>
      <Route exact path="/create" component={AddExpensePage}/>
      <Route exact path="/edit/:id" component={EditExpensePage}/>
      <Route exact path="/help" component={HelpPage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </div>
  </BrowserRouter>
)

export default AppRouter

