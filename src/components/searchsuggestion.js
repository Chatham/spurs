import React from 'react';
import PropTypes from 'prop-types';

const SearchSuggestion = (suggestion) => (
  <div>
    {suggestion}
  </div>
);

SearchSuggestion.propTypes = {
  suggestion: PropTypes.string.isRequired
};

export default SearchSuggestion;
