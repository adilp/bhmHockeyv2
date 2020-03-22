import React, { Component } from "react";
import AppContainer from "./App";

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducer';



export default class App extends Component {
  render() {
    return (
        <Provider store={ createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppContainer />
      </Provider>
    );
  }
}