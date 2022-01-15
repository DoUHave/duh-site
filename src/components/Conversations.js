import React, { Component } from "react";
import { Spinner } from "reactstrap";
import ConversationItem from "../components/ConversationItem";
import OfferService from "../services/OfferService";

/**
 * Conversations view component
 * It shows an item conversations list based on the offers (clickable)
 * @author dassiorleando
 */
class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = { offers: [] };
    this.itemId = this.props.itemId;
  }

  /**
   * Once the component is mounted we get the item's offers
   */
  async componentDidMount() {
    let offers = [];
    this.setState({ loading: true });
    try {
      offers = await OfferService.getItemOffers(
        this.itemId,
        this.props.type === "inquired" ? "1" : "0"
      );
    } catch (error) {}
    this.setState({ loading: false, offers: offers });
  }

  render() {
    let itemId = this.itemId;

    return (
      <div className="Conversations">
        {itemId && !this.state.loading ? (
          <>
            {this.state.offers.length > 0 ? (
              this.state.offers.map((offer) => (
                <ConversationItem
                  offer={offer}
                  key={offer._id}
                  openConversation={this.props.openConversation}
                />
              ))
            ) : (
              <div className="m-20">No offers submitted yet!</div>
            )}
          </>
        ) : (
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
        )}
      </div>
    );
  }
}

export default Conversations;
