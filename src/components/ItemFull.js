import React, { Component } from "react";
import Constant from "../util/Constant";

class ItemFull extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: this.props.itemId,
      itemFetch: "",
      imgSrc: "",
      closed: this.props.closed,
    };
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    const { itemId, itemFetch, imgSrc } = this.state;

    fetch(`${Constant.API_ENDPOINT}/items/item/${itemId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.item) {
          this.setState({
            itemFetch: json.item,
            imgSrc: json.item.itemImg.startsWith("http")
              ? json.item.itemImg
              : json.item.itemImg.substring(
                  json.item.itemImg.lastIndexOf("/") - 17,
                  json.item.itemImg.length
                ),
          });
        }
      });
  }

  onClose = () => {
    const { closed } = this.state;

    if (!closed) {
      this.setState({
        closed: true,
      });
    } else {
      this.setState({
        closed: false,
      });
    }
  };

  render() {
    const { itemId, itemFetch, imgSrc, closed } = this.state;

    let isAuth = this.props.isAuth;

    return (
      <div
        className="ItemFull"
        onClick={this.props.onClose}
        style={{ display: this.state.closed ? "none" : "block" }}
      >
        <div className="item-panel">
          <div className="close-panel" onClick={this.onClose}>
            X
          </div>
          <img src={imgSrc} />
          <h5 id="itemBudget">Budget: ${itemFetch.budget} </h5>

          <h5 id="itemCategory">Category: {itemFetch.category} </h5>
          <h5 id="itemLocation">
            Location: {itemFetch.location}, {itemFetch.locationState}
          </h5>

          <h5 id="itemCondition">Condition: {itemFetch.condition} </h5>
          <div id="itemDescription">
            <h5>Description: </h5>
            <p>{itemFetch.description}</p>
          </div>
          <div id="itemSubmittedby">
            <h5>Submitted By: </h5> <p> {itemFetch.submittedby}</p>
            <br />
            <h5>Contact Number: </h5>{" "}
            {isAuth ? itemFetch.contactinfo : <p>Please Log In</p>}
          </div>
          <div id="itemDate">
            <h5>Submitted On:</h5> {itemFetch.createdAt}
          </div>

          {itemFetch.carmake !== "" &&
          itemFetch.carmake !== null &&
          itemFetch.carmake !== undefined ? (
            <>
              <div id="itemMake">
                <h5>Car Make:</h5> {itemFetch.carmake} <br />
              </div>
            </>
          ) : null}
          {itemFetch.carmodel !== "" &&
          itemFetch.carmodel !== null &&
          itemFetch.carmodel !== undefined ? (
            <>
              <div id="itemModel">
                <h5>Car Model:</h5> {itemFetch.carmodel} <br />
              </div>
            </>
          ) : null}
          {itemFetch.caryear !== "" &&
          itemFetch.caryear !== null &&
          itemFetch.caryear !== undefined ? (
            <>
              <div id="itemYear">
                <h5>Car Year:</h5> {itemFetch.caryear} <br />
              </div>
            </>
          ) : null}
          {itemFetch.cellmake !== "" &&
          itemFetch.cellmake !== null &&
          itemFetch.cellmake !== undefined ? (
            <>
              <div id="itemCellMake">
                <h5>Cell Make:</h5> {itemFetch.cellmake} <br />
              </div>
            </>
          ) : null}
          {itemFetch.cellmodel !== "" &&
          itemFetch.cellmodel !== null &&
          itemFetch.cellmodel !== undefined ? (
            <>
              <div id="itemCellModel">
                <h5>Cell Model:</h5> {itemFetch.cellmodel}
                <br />
              </div>
            </>
          ) : null}
          {itemFetch.cellcarrier !== "" &&
          itemFetch.cellcarrier !== null &&
          itemFetch.cellcarrier !== undefined ? (
            <>
              <div id="itemCellCarrier">
                <h5>Cell Carrier:</h5> {itemFetch.cellcarrier} <br />
              </div>
            </>
          ) : null}
          {itemFetch.cellos !== "" &&
          itemFetch.cellos !== null &&
          itemFetch.cellos !== undefined ? (
            <>
              <div id="itemCellOs">
                <h5>Cell Operating System:</h5> {itemFetch.cellos} <br />
              </div>
            </>
          ) : null}
          {itemFetch.gamesystem !== "" &&
          itemFetch.gamesystem !== null &&
          itemFetch.gamesystem !== undefined ? (
            <>
              <div id="itemGameSystem">
                <h5>Game System:</h5> {itemFetch.gamesystem} <br />
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ItemFull;
