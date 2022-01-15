import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import OfferService from "../services/OfferService";
import SocketService from "../services/SocketService";
import UserService from "../services/UserService";

/**
 * Modal UI to send quick message to the item owner.
 * @author dassiorleando
 */
class OfferSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modal: true,
      itemId: this.props.itemId,
      submitter: this.props.submitter,
      isAuth: UserService.isConnected(),
      myEmail: "",
      myPhone: "",
      myMessage: "",
      myOffer: null,
      socket: null,
    };

    const { token, userId } = UserService.getUserSessionDetails() || {};
    this.token = token;
    this.userId = userId;
    this.onChangeMessage = this.onChangeMessage.bind(this);
  }

  async componentDidMount() {
    const self = this;
    // Getting the current user offer for this item
    let isAuth = UserService.isConnected();
    if (isAuth) {
      const myItemOffers = await OfferService.getItemOffers(
        this.props.itemId,
        "1"
      );
      const myOffer = myItemOffers && myItemOffers[0];
      this.setRoomAndFromTo(myOffer);

      // Getting the socket client
      SocketService.getSocketBehaviorObject().subscribe((socket) => {
        if (socket) {
          self.setState({ socket });
        }
      });
    }
  }

  setRoomAndFromTo(myOffer) {
    if (myOffer) {
      this.roomId = `${
        myOffer.itemOwner._id ? myOffer.itemOwner._id : myOffer.itemOwner
      }_${myOffer._id}_${
        myOffer.submittedBy._id ? myOffer.submittedBy._id : myOffer.submittedBy
      }`;
      this.setState({ myOffer });

      const userInfo = UserService.getUserSessionDetails();
      const userId = userInfo.userId || userInfo._id;
      // Item owner and submitter of the offer
      const itemOwner = myOffer.itemOwner._id
        ? myOffer.itemOwner._id
        : myOffer.itemOwner;
      const submittedBy = myOffer.submittedBy._id
        ? myOffer.submittedBy._id
        : myOffer.submittedBy;

      // Determining the from and to from the chat
      if (itemOwner === userId) {
        this.from = itemOwner;
        this.to = submittedBy;
      } else {
        this.from = submittedBy;
        this.to = itemOwner;
      }
    }
  }

  onChangeMessage(event) {
    this.setState({
      myMessage: event.target.value,
    });
  }

  /**
   * Sends a message to the other end
   */
  async sendMessage() {
    if (this.userId === this.state.submitter) {
      alert("You can't message yourself, it's your post.");
      this.closeModal();
      return;
    }

    const socketClient = this.state.socket;
    if (socketClient) {
      if (this.state.myMessage) {
        this.setState({ loading: true });
        try {
          if (!this.roomId) {
            const myOffer = await OfferService.postOffer({
              itemId: this.state.itemId,
              offerMessage: this.state.myMessage,
            });
            this.setRoomAndFromTo(myOffer);
            this.sendMessage();
          } else {
            const data = {
              type: "CHAT",
              from: this.from,
              to: this.to,
              message: this.state.myMessage,
              roomId: this.roomId,
            };
            socketClient.send(JSON.stringify(data));
            this.setState({ loading: false });
            this.closeModal();
          }
        } catch (error) {
          console.log("error--->", error);
          if (error.response) {
            const message = error.response.data.message;
            alert(message);
          }
          this.setState({ loading: false });
          this.closeModal();
        }
      } else {
        alert("Invalid message");
      }
    } else {
      this.setState({ loading: false });
      this.closeModal();
    }
  }

  closeModal() {
    this.setState({ modal: false });
    if (this.props.onClosed) {
      this.props.onClosed();
    }
  }

  /**
   * Sending a message on enter key pressed
   * @param {*} e
   */
  onKeyPress = (e) => {
    if (e.which === 13 && this.state.myMessage) {
      this.sendMessage();
    }
  };

  render() {
    const { isAuth } = this.state;

    return (
      <div className="OfferSubmit">
        {
          <div className="offer-submit-form">
            <Modal
              isOpen={this.state.modal}
              toggle={() => {
                this.closeModal();
              }}
            >
              <ModalHeader> Send your message </ModalHeader>
              <ModalBody>
                {isAuth ? (
                  !this.state.loading ? (
                    <FormGroup>
                      <Input
                        type="textarea"
                        name="text"
                        id="text-message"
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChangeMessage}
                      />
                    </FormGroup>
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
                  )
                ) : (
                  <p className="text-center">Please Log In or Register...</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  disabled={!this.state.myMessage}
                  onClick={() => {
                    this.sendMessage();
                  }}
                >
                  Send
                </Button>{" "}
                <Button
                  color="danger"
                  onClick={() => {
                    this.closeModal();
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        }
      </div>
    );
  }
}

export default OfferSubmit;
