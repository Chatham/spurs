import {connect} from 'react-redux';
import {fetchAndBuildSuggestions, clearSuggestions, selectProject, searchValueChange} from '../actions';
import Search from '../components/search.js';

const mapStateToProps = state => {
  return {value: state.searchValue, suggestions: state.searchSuggestions}
};

const mapDispatchToProps = dispatch => {
  return {
    onSuggestionsFetchRequested: ({value}) => {
      dispatch(fetchAndBuildSuggestions(value));
    },
    onSuggestionsClearRequested: () => {
      dispatch(clearSuggestions());
    },
    onSuggestionSelected: (event, {suggestionValue}) => {
      dispatch(selectProject(suggestionValue));
    },
    onChange: (event, {newValue}) => {
      dispatch(searchValueChange(newValue));
    }
  }
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
