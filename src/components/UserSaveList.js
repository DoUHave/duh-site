import React, { Component } from "react";
import { Col, Row, Spinner } from "reactstrap";
import ItemService from "../services/ItemService";
import UserService from "../services/UserService";
import ItemBox from "./itemBox/ItemBox";

class UserSaveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      token: this.props.token,
      items: [],
      edit: false,
      loading: true,
      selectedItem: {},
      singleResult: "",
      deletethis: false,
    };
    this.onOfferSubmit = this.onOfferSubmit.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  async componentDidMount() {
    try {
      const items = (await ItemService.getSavedItems(this.state.userId)) || [];
      this.setState({ items });
    } catch (error) {}
    this.setState({ loading: false });
  }

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

  render() {
    const isAuth = UserService.isConnected();
    const { userName, firstName, email } = UserService.getUserSessionDetails();

    const {
      userId,
      items,
      count,
      singleResult,
      token,
      deletethis,
    } = this.state;

    return (
      <div className="UserSaveList">
        {this.state.loading ? (
          <>
            <Spinner
              className="block-center"
              style={{ width: "5rem", height: "5rem" }}
            />
            <h3>Did You Know?</h3>
            <p>
            DOUHAVE's "Get Matches Now" service searches over 80 different platforms for you when you post what you need?
            </p>
          </>
        ) : (
          <Row style={{ maxWidth: "100%" }}>
            {items.length > 0 ? (
              items.map((model) => (
                <Col key={model._id}>
                  <ItemBox item={model} showSaveItem={false} />
                </Col>
              ))
            ) : (
              <div className="block-center m-40">No items saved yet!</div>
            )}
          </Row>
        )}
      </div>
    );
  }
}

export default UserSaveList;
