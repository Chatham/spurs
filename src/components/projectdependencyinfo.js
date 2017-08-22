import React from 'react';
import PropTypes from 'prop-types';
import DependencyList from './dependencylist.js';

const ProjectDependencyInfo = ({name, location, dependencyOf, dependencies, gotoProject}) => {
  if (name.length === 0) {
    return (<div></div>);
  }

  return (
    <div className="projectdependencyinfo">
      {location.length > 0 &&
        <div className="location" >Location: <a href={location}>{location}</a></div>
      }
      <DependencyList
        name="Dependency Of"
        dependencies={dependencyOf}
        onDependencyClick={gotoProject}/>
      <DependencyList
        name="Dependencies"
        dependencies={dependencies}
        onDependencyClick={gotoProject}/>
    </div>
  )
};

ProjectDependencyInfo.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  dependencyOf: PropTypes
    .object
    .isRequired,
  dependencies: PropTypes
    .object
    .isRequired,
  gotoProject: PropTypes.func.isRequired
};

export default ProjectDependencyInfo;
