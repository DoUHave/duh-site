import React, { Component } from "react";
import { Col, Row, Spinner } from "reactstrap";
import ItemService from "../services/ItemService";
import UserService from "../services/UserService";
import ItemBox from "./itemBox/ItemBox";

class UserItems extends Component {
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
    this.onCancel = this.onCancel.bind(this);
  }

  async componentDidMount() {
    try {
      const items = (await ItemService.getUserItems(this.state.userId)) || [];
      this.setState({ items });
    } catch (error) {}
    this.setState({ loading: false });
  }

  onEditItem(id) {
    const { edit, singleResult } = this.state;
    if (edit && singleResult === id) {
      this.setState({
        edit: false,
      });
    } else if (edit) {
      this.setState({
        singleResult: id,
      });
    } else {
      this.setState({
        singleResult: id,
        edit: true,
        deletethis: false,
      });
    }
  }

  onDeleteItem(id) {
    const { singleResult, deletethis } = this.state;
    if (deletethis && singleResult === id) {
      this.setState({
        deletethis: false,
      });
    } else if (deletethis) {
      this.setState({
        singleResult: id,
      });
    } else {
      this.setState({
        singleResult: id,
        deletethis: true,
        edit: false,
      });
    }
  }

  onCancel() {
    this.setState({
      edit: false,
      deletethis: false,
      showSaveItem: false,
    });
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

  render() {
    const isAuth = UserService.isConnected();
    const { userName, firstName, email } = UserService.getUserSessionDetails();

    const { userId, items, singleResult, edit, token, deletethis } = this.state;

    return (
      <div className="UserItems">
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
                  <ItemBox item={model} />
                </Col>
              ))
            ) : (
              <div className="block-center m-40">No items created yet!</div>
            )}
          </Row>
        )}
      </div>
    );
  }
}

export default UserItems;
