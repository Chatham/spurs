import React from 'react';
import '../styles/index.scss';
import Autosuggest from 'react-autosuggest';

var _projectNames = null;

class SuggestionCore {
  constructor() {
    this._projectNames = null;
    this._projectIndexInfo = null;
    this._projectInfo = {};
    this._loading = this._loadProjectNames();

  }

  _loadProjectNames() {
    return new Promise((resolve, reject) => {
      fetch('dependency_info/index.json').then(response => {
        response.json().then(index => {
          this._projectIndexInfo = index;
          this._projectNames = Object.keys(index);
          resolve();
        }, errResponse => {
          console.log(errResponse);
          reject("Error extracting JSON data!")
        })
      }, errResponse => {
        console.log(errResponse);
        reject("Error loading data!");
      })
    });
  }

  getSuggestions(value) {
    let inputValue = value.trim().toLowerCase();
    let inputLength = inputValue.length;

    return this._loading.then((resolved) => {
      return inputLength === 0 ? [] : this._projectNames.filter(name =>
        name.toLowerCase().includes(inputValue)
      ); 
    }, (rejected) => {
      return [];
    });
  }

  getProjectDependencyInfo(projectName) {
    return new Promise((resolve, reject) => {
      if (this._projectInfo.hasOwnProperty(projectName)) {
        resolve(this._projectInfo[projectName]);
      } else {
        fetch(`dependency_info/${this._projectIndexInfo[projectName]}`).then(response => {
          return response.json();
        }, errResponse => {
          console.log(errResponse);
          reject(`Error loading ${projectName} data.`)
        }).then(json => {
          this._projectInfo[projectName] = json;
          console.log(json);
          resolve(json);
        })
      }
    });
  }
}

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

export default class App extends React.Component {
  constructor() {
    super();

    this.suggestionCore = new SuggestionCore();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    console.log('onSuggestionsFetchRequests');
    this.suggestionCore.getSuggestions(value).then(resolved => {
      this.setState({
        suggestions: resolved
      });
    }, rejected => {
      this.setState({
        suggestions: []
      });
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestionValue }) => {
    this.suggestionCore.getProjectDependencyInfo(suggestionValue);
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type project name',
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
      </div>
    )
  }
}
