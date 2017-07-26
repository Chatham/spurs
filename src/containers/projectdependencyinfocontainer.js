import {connect} from 'react-redux';
import ProjectDependencyInfo from '../components/projectdependencyinfo.js';

const mapStateToProps = state => {
  return {
    name: state.selectedProject.projectName,
    location: state.selectedProject.dependencyInfo.location,
    dependencyOf: state.selectedProject.dependencyInfo.dependencyOf,
    dependencies: state.selectedProject.dependencyInfo.dependencies,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    gotoProject: (project) => {
      console.log("go to project!", project);
    }
  }
};

const ProjectDependencyInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDependencyInfo);

export default ProjectDependencyInfoContainer;
