/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */

import { useReducer, lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import AuthContext from './context/authContext';
import ReducerContext from './context/reducerContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Example from './pages/Example/Example';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/404/404';
import Login from './pages/Auth/Login/Login';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import ErrorBoundary from './hoc/ErrorBoundary';
import AddContent from './pages/Profile/MyContent/AddContent/AddContent';
import { reducer, intialState } from './reducer';
import Register from './pages/Auth/Register/Register';

const App = function () {
  const [state, dispatch] = useReducer(reducer, intialState);

  const header = <Header />;
  const menu = <Menu />;
  const footer = <div />;
  // const footer = <Footer />;

  const content = (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <AuthenticatedRoute path="/profile/examples/add" component={AddContent} />
            <AuthenticatedRoute path="/profile" component={Profile} />
            <Route path="/examples/:id" component={Example} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );

  return (
    <Router>
      <AuthContext.Provider
        value={{
          user: state.user,
          login: (user) => dispatch({ type: 'login', user }),
          logout: () => dispatch({ type: 'logout' })
        }}>
        <ReducerContext.Provider
          value={{
            state,
            dispatch
          }}>
          <Layout header={header} menu={menu} content={content} footer={footer} />
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
