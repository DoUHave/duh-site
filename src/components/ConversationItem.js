import React, { Component } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Col, Row } from "reactstrap";
import MessageService from "../services/MessageService";
import UserService from "../services/UserService";
import { timeSince } from "../util/helper";

/**
 * ConversationItem view component
 * It shows a specific conversation view for an offer
 * @author dassiorleando
 */
class ConversationItem extends Component {
  constructor(props) {
    super(props);
    this.state = { lastMessage: {} };
    this.offer = this.props.offer;
    this.lastEvaluatedKey = "";
    if (this.offer) {
      this.roomId = `${
        this.offer.itemOwner._id
          ? this.offer.itemOwner._id
          : this.offer.itemOwner
      }_${this.offer._id}_${
        this.offer.submittedBy._id
          ? this.offer.submittedBy._id
          : this.offer.submittedBy
      }`;
    }
  }

  /**
   * Once the component is mounted we get the offer last message
   */
  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const lastMessage = await MessageService.getLastMessage(this.roomId);
      this.setState({ loading: false, lastMessage: lastMessage });
    } catch (error) {}
  }

  render() {
    let offer = this.offer;

    const userInfo = UserService.getUserSessionDetails();
    const userId = userInfo.userId || userInfo._id;
    if (!userId) window.location = "/";

    // Determining the from and to from the chat
    const itemOwner = this.offer.itemOwner._id
      ? this.offer.itemOwner._id
      : this.offer.itemOwner;
    if (itemOwner === userId) {
      this.to = this.offer.submittedBy;
    } else {
      this.to = this.offer.itemOwner;
    }

    return (
      <div
        className="ConversationItem cursor-pointer"
        onClick={() => {
          this.props.openConversation(this.offer);
        }}
      >
        {offer ? (
          <Row>
            <Col xs="4">
              <BiUserCircle className="conversation-icon" />
            </Col>

            <Col xs="8" className="p-0">
              <Row style={{ display: "inline" }}>
                <Col xs="12" className="text-left text-capitalize">
                  {" "}
                  {this.to.lastName} {this.to.firstName}{" "}
                </Col>
                {this.state.lastMessage.message ? (
                  <>
                    <Col xs="12" className="text-left chat-message">
                      {" "}
                      {this.state.lastMessage.message}{" "}
                    </Col>
                    <Col xs="12" className="text-left">
                      {" "}
                      {timeSince(this.state.lastMessage.date)} ago{" "}
                    </Col>
                  </>
                ) : (
                  <div />
                )}
              </Row>
            </Col>
          </Row>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default ConversationItem;
