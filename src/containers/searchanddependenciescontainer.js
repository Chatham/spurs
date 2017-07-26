import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearchContainer from './searchcontainer.js';
import ProjectDependencyInfoContainer from './projectdependencyinfocontainer.js';
import { navigateToProject } from '../actions';

class SearchAndDependencies extends React.Component {
  componentDidMount() {
    if (this.props.location.search !== "") {
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      const projectName = params.get('projectName');
      this.props.navigateToProject(projectName);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search) {
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      const projectName = params.get('projectName');
      this.props.navigateToProject(projectName);
    }
  }

  render() {
    return (
      <div>
        <SearchContainer/>
        <ProjectDependencyInfoContainer/>
      </div>
    );
  }
}

SearchAndDependencies.propTypes = {
  navigateToProject: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToProject: (project) => {
      dispatch(navigateToProject(project));
    }
  }
};

const SearchAndDependenciesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchAndDependencies);

export default SearchAndDependenciesContainer;
