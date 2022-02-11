import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import Categories from "./Categories";
import ItemBox from "./itemBox/ItemBox";

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: this.props.searchResults,
      showItem: false,
      singleResult: "",
      closed: true,
      clickToShow: false,
      selectedItem: {},
      showOfferSubmit: false,
      showSaveItem: false,
      token: this.props.token,
      zipCode: this.props.zipCode,
      distance: this.props.distance,
    };

    this.onItemFull = this.onItemFull.bind(this);
    this.onOfferSubmit = this.onOfferSubmit.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.checkZip = this.checkZip.bind(this);
  }

  onItemFull(id) {
    this.setState({
      singleResult: id,
      showItem: true,
      closed: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults !== this.props.searchResults) {
      this.setState({ searchResults: nextProps.searchResults });
    }
  }

  onClickToShow = () => {
    const { clickToShow } = this.state;
    if (!clickToShow) {
      this.setState({
        clickToShow: true,
      });
    } else {
      this.setState({
        clickToShow: false,
      });
    }
  };

  onOfferSubmit = (id) => {
    const { showOfferSubmit, singleResult } = this.state;
    if (singleResult !== "" && singleResult !== id) {
      this.setState({
        singleResult: id,
        showOfferSubmit: true,
      });
    } else {
      if (!showOfferSubmit) {
        this.setState({
          singleResult: id,
          showOfferSubmit: true,
        });
      } else {
        this.setState({
          showOfferSubmit: false,
          singleResult: "",
        });
      }
    }
  };

  onSaveItem = (id) => {
    const { showSaveItem, singleResult } = this.state;
    if (singleResult !== "" && singleResult !== id) {
      this.setState({
        singleResult: id,
        showSaveItem: true,
      });
    } else {
      if (!showSaveItem) {
        this.setState({
          singleResult: id,
          showSaveItem: true,
        });
      } else {
        this.setState({
          showSaveItem: false,
          singleResult: "",
        });
      }
    }
  };

  onCancel() {
    this.setState({
      showSaveItem: false,
    });
  }

  checkZip(zip) {
    let zipResults = this.props.zipResults || [];
    const parsed_results = [];

    for (var x = 0; x < zipResults.length; x++) {
      parsed_results.push(zipResults[x].zip_code);
    }

    var check_zip = parsed_results.includes(zip);

    return check_zip;
  }

  render() {
    const { searchResults, showItem, singleResult, closed } = this.state;

    let isAuth = this.props.isAuth;
    let userName = this.props.userName;
    let firstName = this.props.firstName;
    let userId = this.props.userId;
    let token = this.props.token;
    let zipResults = this.props.zipResults;
    let zipCode = this.props.zipCode;
    let distance = this.props.distance;

    return (
      <div className="SearchResults">
        <h1>Search Results</h1>
        <Categories />
        <div className="categoryResults">
          <Row style={{ margin: "0px" }}>
            {searchResults.length > 0 ? (
              searchResults.map((model) => (
                <Col key={model._id}>
                  <ItemBox item={model} showSaveItem={true}/>
                </Col>
              ))
            ) : (
              <div className="block-center m-40 w-100">No results to show!</div>
            )}
          </Row>
        </div>
      </div>
    );
  }
}

export default SearchResults;
