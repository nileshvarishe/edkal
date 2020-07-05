import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import * as reducers from "./Reducers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import history from "./history";

import ProductList from "./component/ProductList";
const reducer = combineReducers(Object.assign({}, reducers));

const enhancer = compose(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
      <Switch>
        <Route exact path="/" component={ProductList} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
