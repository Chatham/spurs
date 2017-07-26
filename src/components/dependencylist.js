import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DependencyList = ({name, dependencies, onDependencyClick}) => (
  <div className="dependencylist">
    <p className="name">{name} ({dependencies.length})</p>
    <ul className="items">
      {dependencies.map(dependency => (
        <li className="item" key={dependency}><Link to={`/?projectName=${dependency}`}>{dependency}</Link></li>
      ))}
    </ul>
  </div>
);

DependencyList.propTypes = {
  name: PropTypes.string.isRequired,
  dependencies: PropTypes
    .arrayOf(PropTypes.string)
    .isRequired,
  onDependencyClick: PropTypes.func.isRequired
};

export default DependencyList;
