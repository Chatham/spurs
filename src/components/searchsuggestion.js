import React from 'react';
import PropTypes from 'prop-types';

const SearchSuggestion = (suggestion, { query }) => {
  const queryReg = new RegExp(query, "i");
  const sSplit = suggestion.split(queryReg);
  const beginning = sSplit[0] || "";
  const highlight = suggestion.match(queryReg)[0] || "";
  const end = sSplit[1] || "";

  let suggestionEl;
  if (sSplit.length > 1) {
    suggestionEl = <p className="suggestion">{beginning}<strong>{highlight}</strong>{end}</p>;
  } else {
    suggestionEl = <p className="suggestion">{suggestion}</p>;
  }

  return (
    <div className="searchsuggestion_container">
      {suggestionEl}
    </div>
  )
}

SearchSuggestion.propTypes = {
  suggestion: PropTypes.string.isRequired
};

export default SearchSuggestion;
