export const SEARCH_VALUE_CHANGE = 'SEARCH_VALUE_CHANGE';
export function searchValueChange(newValue) {
  return {
    type: SEARCH_VALUE_CHANGE,
    payload: {
      value: newValue
    }
  };
}

export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
export function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS
  };
}

export const RECEIVE_SUGGESTIONS = 'RECEIVE_SUGGESTIONS';

function receiveSuggestions(suggestions) {
  return {
    type: RECEIVE_SUGGESTIONS,
    payload: {
      suggestions
    }
  };
}

function _filterArrayBasedOnValue(value, arrayToFilter) {
  return value.length === 0 ? [] : arrayToFilter.filter(item => {
    let regex = new RegExp(value, "i");
    return regex.test(item);
  });
}

function buildSuggestions(value) {
  return (dispatch, getState) => {
    const {
      projectNames,
      previousSearchValue,
      searchSuggestions
    } = getState().spurs;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (previousSearchValue.length > inputLength && previousSearchValue.toLowerCase().substring(0, inputLength-1) === inputValue) {
      return dispatch(receiveSuggestions(_filterArrayBasedOnValue(inputValue, searchSuggestions)));
    }

    return dispatch(receiveSuggestions(_filterArrayBasedOnValue(inputValue, projectNames)));
  }
}

export const RECEIVE_PROJECT_INDEX = 'RECEIVE_PROJECT_INDEX';

function receiveProjectIndex(projectIndex) {
  return {
    type: RECEIVE_PROJECT_INDEX,
    payload: {
      projectIndex
    }
  };
}

export const SET_PROJECT_NAMES = 'SET_PROJECT_NAMES';
export function setProjectNamesFromIndex(projectIndex) {
  return {
    type: SET_PROJECT_NAMES,
    payload: {
      projectNames: Object.keys(projectIndex)
    }
  };
}

function _fetchProjectNames() {
  return (dispatch) => {
    return fetch('dependency_info/index.json')
      .then(res => {
        return res.json();
      }, eRes => {
        console.log("error fetching dependency index", eRes);
      })
      .then(projectIndex => {
        dispatch(receiveProjectIndex(projectIndex));
        dispatch(setProjectNamesFromIndex(projectIndex));
      }, eRes => {
        console.log("error fetching dependency index", eRes);
      });
  }
}

export function fetchAndBuildSuggestions(searchValue) {
  return (dispatch, getState) => {
    // only fetch project names once per lifetime of the app
    if (getState().spurs.projectNames.length === 0) {
      return dispatch(_fetchProjectNames()).then(() => {
        dispatch(buildSuggestions(searchValue));
      });
    } else {
      return dispatch(buildSuggestions(searchValue));
    }
  }
}

export const SET_SELECTED_PROJECT = 'SET_SELECTED_PROJECT';

function setSelectedProject(projectName) {
  return {
    type: SET_SELECTED_PROJECT,
    payload: {
      projectName
    }
  };
}

export const RECEIVE_PROJECT_DEPENDENCY_INFO = 'RECEIVE_PROJECT_DEPENDENCY_INFO';

function receiveProjectDependencyInfo(projectName, dependencyInfo) {
  return {
    type: RECEIVE_PROJECT_DEPENDENCY_INFO,
    payload: {
      projectName,
      dependencyInfo
    }
  };
}

function _fetchProjectDependencyInfo(projectName) {
  return (dispatch, getState) => {
    const projectDependencyInfoLocation = getState().spurs.projectIndex[projectName];

    return fetch(`dependency_info/${projectDependencyInfoLocation}`)
      .then(res => {
        return res.json();
      }, eRes => {
        console.log("error fetching project info", projectName, eRes);
      })
      .then(dependencyInfo => {
        dispatch(receiveProjectDependencyInfo(projectName, dependencyInfo));
      });
  }
}

function _selectProject(projectName) {
  return (dispatch, getState) => {
    if (getState().spurs.projectDependencyInfoList.hasOwnProperty(projectName)) {
      return dispatch(setSelectedProject(projectName));
    }

    return dispatch(_fetchProjectDependencyInfo(projectName)).then(() => {
      dispatch(setSelectedProject(projectName));
    });
  };
}

export function navigateToProject(projectName) {
  return (dispatch) => {
    return dispatch(_fetchProjectNames()).then(() => {
      return dispatch(_selectProject(projectName));
    });
  };
}
