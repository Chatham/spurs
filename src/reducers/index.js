import * as redux from 'redux';

import {
  SEARCH_VALUE_CHANGE,
  CLEAR_SUGGESTIONS,
  RECEIVE_SUGGESTIONS,
  RECEIVE_PROJECT_INDEX,
  SET_PROJECT_NAMES,
  SET_SELECTED_PROJECT,
  RECEIVE_PROJECT_DEPENDENCY_INFO
} from '../actions';

function spurs(state = {
  searchValue: "",
  previousSearchValue: "",
  searchSuggestions: [],
  projectNames: [],
  projectIndex: {},
  projectDependencyInfoList: {},
  selectedProject: {
    projectName: "",
    dependencyInfo: {
      dependencyOf: [],
      dependencies: [],
      location: ""
    }
  }
}, action) {
  switch (action.type) {
    case SEARCH_VALUE_CHANGE:
      const { value } = action.payload;
      const pValue = state.previousSearchValue;
      return { ...state, searchValue: value, previousSearchValue: pValue };
    case CLEAR_SUGGESTIONS:
      return { ...state, searchSuggestions: [] };
    case RECEIVE_SUGGESTIONS:
      const { suggestions } = action.payload;
      return { ...state, searchSuggestions: suggestions };
    case RECEIVE_PROJECT_INDEX:
      const { projectIndex } = action.payload;
      return { ...state, projectIndex };
    case SET_PROJECT_NAMES:
      const { projectNames } = action.payload;
      return { ...state, projectNames };
    case RECEIVE_PROJECT_DEPENDENCY_INFO:
      const { projectName, dependencyInfo } = action.payload;
      state.projectDependencyInfoList[projectName] = dependencyInfo;
      return state;
    case SET_SELECTED_PROJECT:
      const selectedProjectName = action.payload.projectName;
      const selectedProjectDependencyInfo = state.projectDependencyInfoList[selectedProjectName];
      const selectedProject = {
        projectName: selectedProjectName,
        dependencyInfo: selectedProjectDependencyInfo
      };
      return { ...state, selectedProject, searchValue: selectedProjectName };
    default:
      return state;
  }
}

export default spurs;
