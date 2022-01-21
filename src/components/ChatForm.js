import React, { Component } from "react";
import {
  Button,
  Input,
  InputGroup,
  Spinner,
} from "reactstrap";
import UserService from "../services/UserService";

/**
 * Chat form
 * Displaying the chat form + socket connection for the messaging feature
 * @author dassiorleando
 */
class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loading: false,
    };
    this.offer = this.props.offer;
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
   * Once the component is mounted we set up the to/from fields
   */
  componentDidMount() {
    const userInfo = UserService.getUserSessionDetails();
    const userId = userInfo.userId || userInfo._id;
    if (!userId) window.location = "/";

    // Item owner and submitter of the offer
    const itemOwner = this.offer.itemOwner._id
      ? this.offer.itemOwner._id
      : this.offer.itemOwner;
    const submittedBy = this.offer.submittedBy._id
      ? this.offer.submittedBy._id
      : this.offer.submittedBy;

    // Determining the from and to from the chat
    if (itemOwner === userId) {
      this.from = itemOwner;
      this.to = submittedBy;
    } else {
      this.from = submittedBy;
      this.to = itemOwner;
    }
  }

  /**
   * Handles form input change to set the message in the state
   * @param {*} e
   */
  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  /**
   * Sends a message to the other end
   */
  sendMessage() {
    const socketClient = this.props.socket;
    if (socketClient) {
      const data = {
        type: "CHAT",
        from: this.from,
        to: this.to,
        message: this.state.message,
        roomId: this.roomId,
      };
      this.setState({ loading: true });
      socketClient.send(JSON.stringify(data));
      this.setState({ message: "", loading: false });
    } else {
    }
  }

  /**
   * Sending a message on enter key pressed
   * @param {*} e
   */
  onKeyPress = (e) => {
    if (e.which === 13 && this.state.message) {
      this.sendMessage();
    }
  };

  render() {
    return (
      <div className="ChatForm m-20">
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
            <InputGroup>
              <Input
                type="text"
                name="message"
                placeholder="Type your message here"
                value={this.state.message}
                onKeyPress={this.onKeyPress}
                onChange={(e) => {
                  this.handleMessageChange(e);
                }}
              />
              <Input addonType="append">
                <Button
                  disabled={!this.state.message}
                  onClick={() => {
                    alert("hello");
                    this.sendMessage();
                  }}
                >
                  {" "}
                  SEND{" "}
                </Button>
              </Input>
            </InputGroup>
          </div>
        )}
      </div>
    );
  }
}

export default ChatForm;
