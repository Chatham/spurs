import React from 'react';
import PropTypes from 'prop-types';

const SearchSuggestion = (suggestion, { query }) => {
  const sSplit = suggestion.split(query);
  const beginning = sSplit[0] || "";
  const highlight = query;
  const end = sSplit[1] || "";

  return (
    <div className="searchsuggestion_container">
      <p className="suggestion">{beginning}<strong>{highlight}</strong>{end}</p>
    </div>
  )
}

SearchSuggestion.propTypes = {
  suggestion: PropTypes.string.isRequired
};

export default SearchSuggestion;
