import React, { Component } from "react";
import Constant from "../util/Constant";
import SearchResults from "./SearchResults";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      searchResults: [],
      showResults: this.props.showResults,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onTextChange(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  onSearch() {
    const { searchTerm, searchResults, showResults } = this.state;

    fetch(`${Constant.API_ENDPOINT}/items/search2/${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.count > 0) {
          this.setState({
            searchResults: json.items,
            showResults: true,
          });
        }
      });
  }

  render() {
    const { searchTerm, searchResults, showResults } = this.state;
    return (
      <div className="Search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={this.onTextChange}
        />
        <button onClick={this.onSearch}>Search</button>

        {searchResults.length > 0 && showResults ? (
          <SearchResults results={searchResults} />
        ) : null}
      </div>
    );
  }
}

export default Search;
