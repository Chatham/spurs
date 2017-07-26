import React from 'react';
import '../styles/index.scss';
import SearchAndDependenciesContainer from './containers/searchanddependenciescontainer.js';
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router, routerReducer, routerMiddleware } from 'react-router-redux';

import spurs from './reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux';

const history = createHistory();
const rMiddleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    spurs,
    router: routerReducer
  }),
  applyMiddleware(...[thunk, rMiddleware])
);

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="appname">Spurs</h1>
        <p className="tagline">climb your dependency tree</p>
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={SearchAndDependenciesContainer} />
          </Router>
        </Provider>
      </div>
    )
  }
}
