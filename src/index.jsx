import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';

let store = createStore(
  reducer,
  applyMiddleware(thunk)
);

render( <Provider store={store}><AppContainer><App/></AppContainer></Provider>, document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const App = require('./app.jsx').default;
    render(
      <Provider store={store}>
        <AppContainer>
          <App/>
        </AppContainer>
      </Provider>,
      document.querySelector("#app")
    );
  });
}
