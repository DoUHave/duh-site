import React, { Component } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { Button, Col, Row, Spinner } from "reactstrap";
import ChatForm from "../components/ChatForm";
import MessageService from "../services/MessageService";
import ConversationMessagesItem from "./ConversationMessagesItem";

/**
 * ConversationMessages view component
 * It shows a specific conversation messages on the chat view body/middle part
 * @author dassiorleando
 */
class ConversationMessages extends Component {
  // Anchors helpful to scroll top/down
  messagesStartRef = React.createRef();
  messagesEndRef = React.createRef();

  constructor(props) {
    super(props);
    this.offer = this.props.offer;
    this.state = {
      loading: false,
      gettingMoreMessages: false,
      messages: { Items: [] },
      lastEvaluatedKey: null,
    };
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
    this.getMessages(true);

    // Listen for messages
    const socketClient = this.props.socket;
    if (socketClient) {
      const self = this;
      socketClient.onmessage = function(event) {
        try {
          let message = JSON.parse(event.data || "{}");
          if (message.type === "CHAT" && message.roomId === self.roomId) {
            const messages = JSON.parse(JSON.stringify(self.state.messages));
            messages.Items = messages.Items || [];
            messages.Items.push(message);
            self.setState({ messages: messages });
          }
        } catch (error) {}
      };
    }
  }

  /**
   * Triggered when we update the component
   * Useful to determine if we are into a different conversation/selectedOffer to show its messages
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.offer._id !== this.props.offer._id) {
      this.offer = this.props.offer;
      this.roomId = `${
        this.offer.itemOwner._id
          ? this.offer.itemOwner._id
          : this.offer.itemOwner
      }_${this.offer._id}_${
        this.offer.submittedBy._id
          ? this.offer.submittedBy._id
          : this.offer.submittedBy
      }`;
      this.getMessages(true);
    }
  }

  /**
   * Fetch the conversation messages list
   */
  async getMessages(isNewOffer = false) {
    if (isNewOffer) {
      this.setState({
        loading: true,
        gettingMoreMessages: false,
        lastEvaluatedKey: null,
      });
    }
    // Show the loader/spinner
    if (this.state.lastEvaluatedKey) {
      this.setState({ gettingMoreMessages: true });
    }

    try {
      const newMessages = await MessageService.getMessages(
        this.roomId,
        isNewOffer ? "" : this.state.lastEvaluatedKey
      );

      // If it's a paginated query, we add the messages on the top of the array
      if (this.state.lastEvaluatedKey) {
        const stateMessages = this.state.messages;
        stateMessages.Items = newMessages.Items.concat(stateMessages.Items);
        this.setState({
          loading: false,
          gettingMoreMessages: false,
          messages: stateMessages,
        });
        this.scrollInView(true);
      } else {
        this.setState({
          loading: false,
          gettingMoreMessages: false,
          messages: newMessages,
        });
        this.scrollInView();
      }
      this.setState({
        lastEvaluatedKey:
          newMessages.LastEvaluatedKey && newMessages.LastEvaluatedKey.ID,
      });
    } catch (error) {}
  }

  /**
   * Smooth scrolling into view: top or bottom
   * @param {*} top Scroll to the top, if false it's the inverse
   */
  scrollInView(top = false) {
    if (top) {
      this.messagesStartRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      this.messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }

  render() {
    let offer = this.offer;
    let messages = this.state.messages.Items || [];
    // let messages = this.state.messages.Items.reverse();

    // Actors list
    const actors = {};
    actors[offer.itemOwner._id] = offer.itemOwner;
    actors[offer.submittedBy._id] = offer.submittedBy;

    return (
      <div className="ConversationMessages">
        {offer ? (
          <>
            <Row className="submitter-block">
              <Col xs="4">
                <BiUserCircle className="conversation-messages-icon block-center" />
              </Col>

              <Col xs="8" className="p-0">
                <Row style={{ display: "inline" }}>
                  {this.props.type === "offerings" ? (
                    <>
                      <Col xs="12" className="text-left text-capitalize">
                        {" "}
                        {offer.submittedBy.lastName}{" "}
                        {offer.submittedBy.firstName}{" "}
                      </Col>
                      <Col xs="12" className="text-left">
                        {" "}
                        On the {new Date(
                          offer.submittedAt
                        ).toLocaleString()}{" "}
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col xs="12" className="text-left text-capitalize">
                        {" "}
                        {offer.itemOwner.lastName} {offer.itemOwner.firstName}{" "}
                      </Col>
                      <Col xs="12" className="text-left">
                        {" "}
                        On the{" "}
                        {new Date(offer.itemId.createdAt).toLocaleString()}
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>

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
              <Row className="messages-block">
                {messages.length >= 5 ? (
                  <BsFillCaretDownFill
                    size="1.5em"
                    className="action-icon-bottom cursor-pointer block-center"
                    onClick={() => {
                      this.scrollInView();
                    }}
                  />
                ) : (
                  <></>
                )}

                {/* Top anchor for scroll */}
                <div ref={this.messagesStartRef} />

                {this.state.lastEvaluatedKey ? (
                  <Button
                    color="link"
                    className="block-center"
                    onClick={() => {
                      this.getMessages();
                    }}
                  >
                    {" "}
                    Load old messages{" "}
                    {this.state.gettingMoreMessages ? (
                      <Spinner color="primary" />
                    ) : (
                      <></>
                    )}{" "}
                  </Button>
                ) : (
                  <></>
                )}

                {/* messages list */}
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <Col xs="12 p-0" key={message.ID}>
                      <ConversationMessagesItem
                        messageData={message}
                        actors={actors}
                      />
                    </Col>
                  ))
                ) : (
                  <div className="block-center">No messages to show yet!</div>
                )}

                <ChatForm
                  offer={this.offer}
                  socket={this.props.socket}
                  key={this.roomId}
                />

                {/* Bottom anchor for scroll */}
                <div className="mt-40" ref={this.messagesEndRef} />

                {messages.length >= 5 ? (
                  <BsFillCaretUpFill
                    size="1.5em"
                    className="action-icon-top cursor-pointer block-center"
                    onClick={() => {
                      this.scrollInView(true);
                    }}
                  />
                ) : (
                  <></>
                )}
              </Row>
            )}
          </>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default ConversationMessages;
