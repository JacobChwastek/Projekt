import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import ExpensesView from "./views/ExpensesView"

import 'antd/dist/antd.css';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/legacy' component={Home} exact/>
        <Route exact path='/' component={ExpensesView}/>
      </Layout>
    );
  }
}
