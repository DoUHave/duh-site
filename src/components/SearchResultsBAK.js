import React, { Component } from "react";
import { getFromStorage } from "../util/storage";
import ItemFull from "./ItemFull";

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: this.props.results,
      showItem: false,
      singleResult: "",
    };

    this.onItemFull = this.onItemFull.bind(this);
  }

  onItemFull(id) {
    this.setState({
      singleResult: id,
      showItem: true,
    });
  }

  componentDidMount() {
    const obj = getFromStorage("search_results");
    this.setState({
      results: obj.searchResults,
    });
  }

  render() {
    const { results, showItem, singleResult } = this.state;

    return (
      <div className="SearchResults">
        Got Results!
        {results.map((model) => (
          <div key={model._id} onClick={() => this.onItemFull(model._id)}>
            <label>Name: {model.name} </label> <br />
            <label>Budget: {model.budget} </label> <br />
            <label>Category: {model.category} </label> <br />
            <label>Condition: {model.condition} </label> <br />
            <label>Description: {model.description} </label> <br />
            <label>Location: {model.location} </label> <br />
            <label>Submitted By: {model.submittedby} </label> <br />
            <label>Submitted On: {model.createdAt} </label> <br />
            <label>Expires On: {model.expirationDate} </label> <br />
            {model.carmake !== "" &&
            model.carmake !== null &&
            model.carmake !== undefined ? (
              <>
                <label>Car Make: {model.carmake}</label>
                <br />
              </>
            ) : null}
            {model.carmodel !== "" &&
            model.carmodel !== null &&
            model.carmodel !== undefined ? (
              <>
                <label>Car Model: {model.carmodel}</label>
                <br />
              </>
            ) : null}
            {model.caryear !== "" &&
            model.caryear !== null &&
            model.caryear !== undefined ? (
              <>
                <label>Car Year: {model.caryear}</label>
                <br />
              </>
            ) : null}
            {model.cellmake !== "" &&
            model.cellmake !== null &&
            model.cellmake !== undefined ? (
              <>
                <label>Cell Make: {model.cellmake}</label>
                <br />
              </>
            ) : null}
            {model.cellmodel !== "" &&
            model.cellmodel !== null &&
            model.cellmodel !== undefined ? (
              <>
                <label>Cell Model: {model.cellmodel}</label>
                <br />
              </>
            ) : null}
            {model.cellcarrier !== "" &&
            model.cellcarrier !== null &&
            model.cellcarrier !== undefined ? (
              <>
                <label>Cell Carrier: {model.cellcarrier}</label>
                <br />
              </>
            ) : null}
            {model.cellos !== "" &&
            model.cellos !== null &&
            model.cellos !== undefined ? (
              <>
                <label>Cell Operating System: {model.cellos}</label>
                <br />
              </>
            ) : null}
            {model.gamesystem !== "" &&
            model.gamesystem !== null &&
            model.gamesystem !== undefined ? (
              <>
                <label>Game System: {model.gamesystem}</label>
                <br />
              </>
            ) : null}
            {this.state.showItem && singleResult === model._id ? (
              <ItemFull itemId={singleResult} />
            ) : null}
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
