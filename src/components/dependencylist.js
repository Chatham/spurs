import React from 'react';
import PropTypes from 'prop-types';

const DependencyList = ({name, dependencies, onDependencyClick}) => (
  <div>
    <p>{name}</p>
    <ul>
      {dependencies.map(dependency => (
        <li key={dependency}>{dependency}</li>
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
