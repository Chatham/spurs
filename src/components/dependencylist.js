import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DependencyList = ({name, dependencies, onDependencyClick}) => (
  <div className="dependencylist">
    <p className="name">{name} ({Object.keys(dependencies).length})</p>
    <ul className="items">
      {Object.keys(dependencies).map(dep => (
        <li className="item" key={dep}><Link to={`?projectName=${dep}`}>{dependencies[dep].transient === true && <span title="transient dependency">&#9768;&nbsp;</span> }{dep}</Link></li>
      ))}
    </ul>
  </div>
);

DependencyList.propTypes = {
  name: PropTypes.string.isRequired,
  dependencies: PropTypes
    .object
    .isRequired,
  onDependencyClick: PropTypes.func.isRequired
};

export default DependencyList;
