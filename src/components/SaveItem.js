import React, { Component } from "react";
import { FaWindowClose } from "react-icons/fa";
import UserService from "../services/UserService";
import Constant from "../util/Constant";

class SaveItem extends Component {
  constructor(props) {
    super(props);
    const item = this.props.model;
    const token = this.props.token;

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const item = this.props.model;
    const { token, firstName, userId } =
      UserService.getUserSessionDetails() || {};

    fetch(`${Constant.API_ENDPOINT}/savelist`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId: item._id,
        name: item.name,
        itemImg: item.itemImg,
        budget: item.budget,
        category: item.category,
        condition: item.condition,
        location: item.location,
        locationState: item.locationState,
        submittedby: item.submittedby,
        submittedby1: item.submittedby1,
        savedby: firstName,
        savedby1: userId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === "List Saved") {
          window.location.reload();
        } else {
          alert(json.message || (json.error && json.error.message) || "");
        }
      });
  }

  render() {
    const isAuth = UserService.isConnected();

    return (
      <div className="SaveItem">
        {!isAuth ? (
          <p>
            Please Log In or Register ...{" "}
            <FaWindowClose onClick={this.props.onCancel} />
          </p>
        ) : null}
        {isAuth ? (
          <>
            <div style={{ fontWeight: "500", fontSize: "11px" }}>
              Are you sure you want to Save Item?
            </div>

            <button
              style={{ fontSize: "11px", border: "none" }}
              onClick={this.onSave}
            >
              YES
            </button>
            <button
              style={{ fontSize: "11px", border: "none" }}
              onClick={this.props.onCancel}
            >
              Cancel
            </button>
          </>
        ) : null}
      </div>
    );
  }
}

export default SaveItem;
