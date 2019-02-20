import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import mainPage from './mainPage.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        <BrowserRouter>

          <div className="App">
            <Switch>
              <Route exact path = "/" component={mainPage} />
            </Switch>

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
