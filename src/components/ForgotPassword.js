import React, { Component } from "react";
import { Col, Container, Row, Spinner } from "reactstrap";
import SubmitButton from "../img/Button- Submit.png";
import UserService from "../services/UserService";
import { withRouter } from '../util/withRouter.js'

/**
 * Forgot password component.
 * Handle forgot password processes: initiation and confirmation form.
 * @author dassiorleando
 */
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      newPassword: "",
      errorMessage: "",
      loading: false,
      emailSent: false,
      passwordResetSuccessfully: false,
    };
    this.resetToken = props.params.resetToken;

    // Binding for some click events
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.forgotPwdAction = this.forgotPwdAction.bind(this);
  }

  /**
   * Once the component is mounted we get the item from the location state or from the API as fallback
   */
  async componentDidMount() {}

  onEmailInputChange(event) {
    this.setState({
      userEmail: event.target.value,
    });
  }

  onPasswordInputChange(event) {
    this.setState({
      newPassword: event.target.value,
    });
  }

  /**
   * Sending the login action on enter key pressed
   * @param {*} e
   */
  onKeyPress = (e) => {
    if (e.which === 13 && this.state.userEmail) {
      this.forgotPwdAction();
    }
  };

  async forgotPwdAction(event) {
    if (event) event.preventDefault();
    try {
      let result;
      this.setState({ loading: true, errorMessage: "" });
      if (this.resetToken) {
        result =
          (await UserService.setNewPwd(
            this.resetToken,
            this.state.newPassword
          )) || {};
      } else {
        result =
          (await UserService.sendPwdResetEmail(this.state.userEmail)) || {};
      }
      this.setState({
        loading: false,
        emailSent: this.resetToken ? false : true,
        passwordResetSuccessfully: this.resetToken ? true : false,
      });
    } catch (error) {
      const message =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      this.setState({ loading: false, errorMessage: message });
    }
  }

  render() {
    return (
      <div className="forgot-password Register">
        <div className="Register text-center">
          <h1 style={{ paddingTop: "150px" }}>FORGOT PASSWORD</h1>
          <h3 style={{ fontWeight: "400", color: "#A9A9A9" }}>
            Enter Your Email Address
          </h3>
          <hr
            style={{
              backgroundColor: "#000000",
              width: "70%",
              marginTop: "30px",
            }}
          />
          <hr
            style={{
              backgroundColor: "#000000",
              width: "50%",
              marginTop: "30px",
            }}
          />
          <div style={{ fontWeight: "700" }}>
            {this.resetToken ? (
              <Col className="text-center">Reset Password</Col>
            ) : (
              <Col className="text-center">Forgot Password</Col>
            )}
          </div>
        </div>

        <Container className="w-100" style={{ paddingTop: "5%" }}>
          {/* <Row className="mb-20">
            {
              this.pwdResetToken
              ? <Col className="text-center"><h3>RESET PASSWORD</h3></Col>
              : <Col className="text-center"><h3>FORGOT PASSWORD</h3></Col>
            }
          </Row> */}

          {this.state.emailSent || this.state.passwordResetSuccessfully ? (
            <>
              {this.state.passwordResetSuccessfully ? (
                <div className="text-center">
                  Password updated successfully, now you can sign in from the
                  top menu.
                </div>
              ) : (
                <div className="text-center">
                  Password reset instructions have been sent to your associated
                  email address. Please check your spam or junk folder if you do
                  not see it in your inbox. (Reset email expires after 30
                  minutes).
                </div>
              )}
            </>
          ) : (
            <>
              <Row className="mb-20">
                {this.resetToken ? (
                  <Col className="text-center">
                    Enter your new password below then hit the submit button.
                  </Col>
                ) : (
                  <Col className="text-center">
                    Forgot your Password? Let's get you a new one. Please enter
                    the email address associated with your account.
                  </Col>
                )}
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
                <></>
              )}
              <div className="text-danger text-center mb-20">
                {this.state.errorMessage}
              </div>

              <Row className="mb-20">
                <Col xs="12" sm="8" className="offset-sm-2">
                  {this.resetToken ? (
                    <div className="SignupInput">
                      <input
                        style={{ width: "100%" }}
                        type="password"
                        name="newPassword"
                        id="newPasswordField"
                        value={this.state.newPassword}
                        onChange={this.onPasswordInputChange}
                        onKeyPress={this.onKeyPress}
                      />
                      <br />
                    </div>
                  ) : (
                    // <Input type="password" name="newPassword" id="newPasswordField" value={this.state.newPassword} onChange={this.onPasswordInputChange} onKeyPress={this.onKeyPress} />
                    <div className="SignupInput">
                      <input
                        style={{ width: "100%" }}
                        type="email"
                        name="userEmail"
                        id="userEmailField"
                        placeholder="Your email"
                        value={this.state.userEmail}
                        onChange={this.onEmailInputChange}
                        onKeyPress={this.onKeyPress}
                      />
                      <br />
                    </div>
                  )
                  // <Input type="email" name="userEmail" id="userEmailField" placeholder="Your email" value={this.state.userEmail} onChange={this.onEmailInputChange} onKeyPress={this.onKeyPress} />
                  }
                </Col>
              </Row>

              <Row className="mb-20">
                <div className="block-center">
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      marginTop: "30px",
                      marginBottom: "70px",
                      cursor: "pointer",
                    }}
                    disabled={this.state.loading}
                    onClick={() => {
                      this.forgotPwdAction();
                    }}
                  >
                    <img
                      style={{ height: "40px", width: "100px" }}
                      src={SubmitButton}
                      alt="Submit"
                    />
                  </button>
                  {/* <Button color="primary" disabled={this.state.loading} onClick={() => { this.forgotPwdAction() }}>Submit</Button>{' '} */}
                </div>
              </Row>
            </>
          )}
        </Container>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
