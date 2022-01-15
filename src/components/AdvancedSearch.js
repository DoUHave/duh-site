import React, { Component } from "react";
import Constant from "../util/Constant";
import SearchResults from "./SearchResults";

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      searchResults: [],
      showResults: false,
      isAuth: this.props.isAuth,
      userId: this.props.userId,
      token: this.props.token,
      category: "",
      condition: "",
      locationState: "TX",
      firstName: this.props.firstName,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onTextChangeCategory = this.onTextChangeCategory.bind(this);
    this.onTextChangeCondition = this.onTextChangeCondition.bind(this);
    this.onTextChangeLocationState = this.onTextChangeLocationState.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.fetchSearch = this.fetchSearch.bind(this);
  }

  onTextChange(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  onTextChangeLocationState(event) {
    this.setState({
      locationState: event.target.value,
    });
  }

  onTextChangeCategory(event) {
    this.setState({
      category: event.target.value,
    });
  }
  onTextChangeCondition(event) {
    this.setState({
      condition: event.target.value,
    });
  }

  fetchSearch(searchAddress, searchTerm) {
    fetch(`${Constant.API_ENDPOINT}/${searchAddress}${searchTerm}`, {
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
          });
        }
      });
  }

  onSearch() {
    const {
      searchTerm,
      searchResults,
      showResults,
      category,
      condition,
      locationState,
    } = this.state;

    if (!showResults) {
      this.setState({
        showResults: true,
      });
    }

    if (category === "" && condition === "" && locationState === "") {
      this.fetchSearch("/items/search2/", searchTerm);
    } else if (condition === "" && locationState === "") {
      this.fetchSearch(`/items/search1/${category}/`, searchTerm);
    } else if (category === "" && locationState === "") {
      this.fetchSearch(`/items/search7/${condition}/`, searchTerm);
    } else if (category === "" && condition === "") {
      this.fetchSearch(`/items/search6/${locationState}/`, searchTerm);
    } else if (locationState === "") {
      this.fetchSearch(`/items/search3/${category}/${condition}/`, searchTerm);
    } else if (category === "") {
      this.fetchSearch(
        `/items/search8/${locationState}/${condition}/`,
        searchTerm
      );
    } else if (condition === "") {
      this.fetchSearch(
        `/items/search5/${locationState}/${category}/`,
        searchTerm
      );
    } else {
      this.fetchSearch(
        `/items/search4/${locationState}/${category}/${condition}/`,
        searchTerm
      );
    }
  }

  render() {
    const {
      searchTerm,
      searchResults,
      category,
      condition,
      locationState,
    } = this.state;

    let isAuth = this.props.isAuth;
    let token = this.props.token;
    let userId = this.props.userId;
    let firstName = this.props.firstName;

    return (
      <div className="AdvancedSearch">
        <div className="Search advanced">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={this.onTextChange}
          />
          <button onClick={this.onSearch}>Search</button>
          <br />
          <select required name={category} onChange={this.onTextChangeCategory}>
            <option value="">--Category--</option>
            <option value="auto">Car's and Trucks</option>
            <option value="appliance">Appliances</option>
            <option value="moto">Moto/ATV/UTV</option>
            <option value="cell">Cell Phones</option>
            <option value="furniture">Furniture</option>
            <option value="instrument">Musical Instruments</option>
            <option value="game">Video Games</option>
            <option value="clothing">Clothing & Accessories</option>
            <option value="collectible">Antiques & Collectibles</option>
            <option value="beauty">Beauty & Cosmetics</option>
            <option value="comequip">Commercial & Restaurant Equipment</option>
            <option value="misc">Everything Else</option>
            <option value="housing">Housing & Places to Live</option>
            <option value="autoservice">Auto Services</option>
            <option value="homeservice">Home Services</option>
          </select>

          <select
            required
            name={condition}
            onChange={this.onTextChangeCondition}
          >
            <option value="">--Condition--</option>
            <option value="new">New</option>
            <option value="likeNew">Like New</option>
            <option value="lightlyUsed">Lightly Used</option>
            <option value="used">Used</option>
            <option value="wellUsed">Well Used</option>
            <option value="needRepair">Needs Some Repair</option>
            <option value="parts">Parts</option>
          </select>
          <select
            required
            name={locationState}
            onChange={this.onTextChangeLocationState}
          >
            <option value="TX">TX</option>
          </select>
          <p>*currently limited to Dallas, TX</p>
        </div>

        {this.state.showResults ? (
          <SearchResults
            isAuth={isAuth}
            userId={userId}
            searchResults={searchResults}
            token={token}
            firstName={firstName}
          />
        ) : null}
      </div>
    );
  }
}

export default AdvancedSearch;
