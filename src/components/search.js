import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import SearchSuggestion from './searchsuggestion.js';

const Search = ({
  value,
  suggestions,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  onChange
}) => (
  <Autosuggest
    suggestions={suggestions}
    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
    onSuggestionsClearRequested={onSuggestionsClearRequested}
    getSuggestionValue={suggestion => {
      return suggestion;
    }}
    renderSuggestion={SearchSuggestion}
    inputProps={{
      placeholder: 'Type project name',
      value,
      onChange
    }}
    onSuggestionSelected={onSuggestionSelected}
  />
);

Search.propTypes = {
  value: PropTypes.string.isRequired,
  suggestions: PropTypes
    .arrayOf(PropTypes.string)
    .isRequired,
  onSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Search;
