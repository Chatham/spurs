import React from 'react';
import '../styles/index.scss';
import SearchContainer from './containers/searchcontainer.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <SearchContainer/>
      </div>
    )
  }
}
