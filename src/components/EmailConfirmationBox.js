import React, { Component } from "react";
import { Alert, Button } from "reactstrap";
import UserService from "../services/UserService";

/**
 * Email confirmation box.
 * @author dassiorleando
 */
class EmailConfirmationBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sent: false,
      loading: false,
      errorMessage: "",
    };
    this.resendConfirmationEmail = this.resendConfirmationEmail.bind(this);
  }

  /**
   * Resent confirmation email.
   */
  async resendConfirmationEmail() {
    try {
      this.setState({ loading: true, errorMessage: "" });
      await UserService.sendEmailConfirmationEmail();
      this.setState({ sent: true, sending: false });
    } catch (error) {
      const message =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      this.setState({ sent: false, loading: false, errorMessage: message });
    }
  }

  render() {
    const isAuth = UserService.isConnected();
    const { email, emailConfirmed } = UserService.getUserSessionDetails() || {};

    return (
      <>
        {isAuth && !emailConfirmed ? (
          <div className="EmailConfirmationBox">
            {this.state.errorMessage ? (
              <Alert color="danger">{this.state.errorMessage}</Alert>
            ) : !this.state.sent ? (
              <h5>You need to verify your email address. Please 
              <Button
                color="link"
                disabled={this.state.loading}
                onClick={() => {
                  this.resendConfirmationEmail();
                }}
              >
               click here to send
              </Button>
              and check your inbox for a verification email.
              </h5>
            ) : (
              <Alert color="success">
                Confirmation email sent, Check your Inbox, Spam, Promotions, or
                Junk folder.
              </Alert>
            )}
          </div>
        ) : null}
      </>
    );
  }
}

export default EmailConfirmationBox;
