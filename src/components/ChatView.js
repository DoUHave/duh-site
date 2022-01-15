import React, { Component } from "react";
import { Col, Container, Row, Spinner } from "reactstrap";
import ChatItem from "../components/ChatItem";
import ConversationMessages from "../components/ConversationMessages";
import Conversations from "../components/Conversations";
import ItemDetails from "../components/ItemDetails";
import ItemService from "../services/ItemService";
import OfferService from "../services/OfferService";
import SocketService from "../services/SocketService";
import UserService from "../services/UserService";

/**
 * Chat view component
 * It shows an item chat view sections
 * @author dassiorleando
 */
class ChatView extends Component {
  constructor(props) {
    super(props);
    this.itemToShow = {};
    this.state = { loading: false, itemToShow: {}, selectedRoomId: null };
    this.itemId = this.props.match.params.itemId;
  }

  /**
   * Once the component is mounted we get the item from the location state or from the API as fallback
   */
  async componentDidMount() {
    const self = this;
    let itemToShow =
      (this.props.location.state && this.props.location.state.item) || {};
    // If the contact isn't provided into the location state we fetch it using its id if present
    if (!itemToShow._id && this.itemId) {
      this.setState({ loading: true });
      try {
        itemToShow = await ItemService.findById(this.itemId);
      } catch (error) {}
    }
    this.setState({ itemToShow });

    // Getting the socket client
    SocketService.getSocketBehaviorObject().subscribe(async (socket) => {
      if (socket) {
        self.setState({ loading: false, socket });

        // Getting the only offer if it's an inquired type
        if (this.props.type === "inquired") {
          const offers =
            (await OfferService.getItemOffers(
              this.itemId,
              this.props.type === "inquired" ? "1" : "0"
            )) || [];
          this.openConversation(offers[0]);
        }
      }
    });
  }

  /**
   * Callback that opens the conversation messages on the chat view body/middle part
   * @param {*} offer
   * @param {*} messages
   */
  async openConversation(offer, messages) {
    if (!this.state.loading) {
      const selectedRoomId = `${
        offer.itemOwner._id ? offer.itemOwner._id : offer.itemOwner
      }_${offer._id}_${
        offer.submittedBy._id ? offer.submittedBy._id : offer.submittedBy
      }`;
      this.setState({ selectedOffer: offer, selectedRoomId });
      const myOffer = await OfferService.updateOffer({
        messageSeen: true,
        offerId: offer._id,
      });
    } else {
    }
  }

  render() {
    const userInfo = UserService.getUserSessionDetails();
    const userId = userInfo && (userInfo.userId || userInfo._id);
    if (!userId) window.location = "/";

    let itemToShow = this.state.itemToShow;

    return (
      <div className="ItemToShow">
        {itemToShow._id ? (
          <Container
            className="w-100"
            style={{
              paddingTop: "16%",
              paddingLeft: "14%",
              paddingRight: "14%",
            }}
          >
            <h5 className="text-left text-capitalize">
              {" "}
              {this.props.type === "offerings"
                ? "Messages Received"
                : "Messages Sent"}{" "}
            </h5>

            <br />

            <Row className="mb-20">
              {this.props.type === "offerings" ? (
                <Col xs="12" md="3" className="chat-panel">
                  <div className="mt-20">
                    <ChatItem
                      item={itemToShow}
                      type={this.props.type}
                      showAsBox={true}
                    />
                  </div>

                  {userId === itemToShow.submittedby1 ? (
                    // ? <Button outline color="primary" className="mt-10" disabled>Mark Aquired</Button>
                    <></>
                  ) : (
                    <></>
                  )}
                  <hr />

                  <Conversations
                    itemId={itemToShow._id}
                    type={this.props.type}
                    openConversation={this.openConversation.bind(this)}
                  />
                </Col>
              ) : null}

              <Col
                xs="12"
                md={this.props.type === "offerings" ? "6" : "8"}
                className="chat-panel messages-area"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
              >
                {this.state.selectedOffer ? (
                  <ConversationMessages
                    offer={this.state.selectedOffer}
                    socket={this.state.socket}
                    type={this.props.type}
                  />
                ) : (
                  <>
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
                      <div className="text-center mt-40">
                        Please, select a conversation from the left.
                      </div>
                    )}
                  </>
                )}
              </Col>

              <Col
                xs="12"
                md={this.props.type === "offerings" ? "3" : "4"}
                className="chat-panel p-8"
              >
                <ItemDetails item={itemToShow} showAsBox={true} />
              </Col>
            </Row>
          </Container>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default ChatView;
