import React from 'react';
import '../styles/index.scss';
import SearchContainer from './containers/searchcontainer.js';
import ProjectDependencyInfoContainer from './containers/projectdependencyinfocontainer.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="appname">Spurs</h1>
        <p className="tagline">climb your dependency tree</p>
        <SearchContainer/>
        <ProjectDependencyInfoContainer />
      </div>
    )
  }
}
