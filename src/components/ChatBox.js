import React, { Component } from "react";
import { Spinner } from "reactstrap";
import ItemService from "../services/ItemService";
import OfferService from "../services/OfferService";
import UserService from "../services/UserService";
import ChatItem from "./ChatItem";

/**
 * Chat box
 * Displaying the chat box for offerings and inquired
 * @author dassiorleando
 */
class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      items: [],
      userDetails: UserService.getUserSessionDetails() || {},
    };
  }

  componentDidMount() {
    if (this.props.type === "offerings") this.loadItems();
    if (this.props.type === "inquired") this.loadInquires();
  }

  async loadInquires() {
    let items =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.items;
    // If the contact isn't provided into the location state we fetch it using its id if present
    if (!items) {
      this.setState({ loading: true });
      try {
        items = await OfferService.getMyOffers(1);
      } catch (error) {}
    }
    this.setState({ loading: false, items: items || [] });
  }

  async loadItems() {
    let items =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.items;
    // If the contact isn't provided into the location state we fetch it using its id if present
    if (!items) {
      this.setState({ loading: true });
      try {
        items = await ItemService.getUserItems(this.state.userDetails.userId);
      } catch (error) {}
    }
    this.setState({ loading: false, items: items || [] });
  }

  render() {
    return (
      <div className="ChatBox">
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
          <div className={this.props.type}>
            {this.state.items.length > 0 ? (
              this.state.items.map((item) =>
                item && item._id ? (
                  <ChatItem item={item} type={this.props.type} key={item._id} />
                ) : null
              )
            ) : (
              <div className="m-20">No items to show!</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ChatBox;
