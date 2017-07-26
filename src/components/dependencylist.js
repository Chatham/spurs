import React from 'react';
import PropTypes from 'prop-types';

const DependencyList = ({name, dependencies, onDependencyClick}) => (
  <div className="dependencylist">
    <p className="name">{name} ({dependencies.length})</p>
    <ul className="items">
      {dependencies.map(dependency => (
        <li className="item" key={dependency}>{dependency}</li>
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
