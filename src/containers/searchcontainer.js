import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchAndBuildSuggestions, clearSuggestions, searchValueChange} from '../actions';
import Search from '../components/search.js';
import { push } from 'react-router-redux';

const mapStateToProps = state => {
  return {value: state.spurs.searchValue, suggestions: state.spurs.searchSuggestions}
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
      dispatch(push(`/?projectName=${suggestionValue}`));
    },
    onChange: (event, {newValue}) => {
      dispatch(searchValueChange(newValue));
    }
  }
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
