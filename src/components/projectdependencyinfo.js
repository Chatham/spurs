import React from 'react';
import PropTypes from 'prop-types';
import DependencyList from './dependencylist.js';

const ProjectDependencyInfo = ({name, location, dependencyOf, dependencies, gotoProject}) => (
  <div>
    <div>{name}|{location}</div>
    <DependencyList
      name="Dependency Of"
      dependencies={dependencyOf}
      onDependencyClick={gotoProject}/>
    <DependencyList
      name="Dependencies"
      dependencies={dependencies}
      onDependencyClick={gotoProject}/>
  </div>
);

ProjectDependencyInfo.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  dependencyOf: PropTypes
    .arrayOf(PropTypes.string)
    .isRequired,
  dependencies: PropTypes
    .arrayOf(PropTypes.string)
    .isRequired,
  gotoProject: PropTypes.func.isRequired
};

export default ProjectDependencyInfo;
