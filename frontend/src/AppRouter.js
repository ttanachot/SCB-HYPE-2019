import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import LoanSearchPage from './Pages/LoanSearchPage';
import LoanComparePage from './Pages/LoanComparePage';
import LoanSubmitPage from './Pages/LoanSubmitPage';
import LoanSummaryPage from './Pages/LoanSummaryPage';

const AppRouter = props => (
  <HashRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage}></Route>
      <Route exact path="/profile" component={ProfilePage}></Route>
      <Route exact path="/loan-search" component={LoanSearchPage}></Route>
      <Route exact path="/loan-compare" component={LoanComparePage}></Route>
      <Route exact path="/loan-submit" component={LoanSubmitPage}></Route>
      <Route exact path="/loan-summary" component={LoanSummaryPage}></Route>
    </Switch>
  </HashRouter>
);

export default AppRouter;