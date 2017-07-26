import {connect} from 'react-redux';
import ProjectDependencyInfo from '../components/projectdependencyinfo.js';

const mapStateToProps = state => {
  return {
    name: state.spurs.selectedProject.projectName,
    location: state.spurs.selectedProject.dependencyInfo.location,
    dependencyOf: state.spurs.selectedProject.dependencyInfo.dependencyOf,
    dependencies: state.spurs.selectedProject.dependencyInfo.dependencies,
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
