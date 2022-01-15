import React, { Component } from "react";
import { Alert, Spinner } from "reactstrap";
import "whatwg-fetch";
import SubmitButton from "../img/Button- Submit.png";
import Constant from "../util/Constant";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      captcha: "",
      signUpSuccess: "",
      signUpError: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: "",
      passwordConfirm: "",
      mailingListRegistration: true,
    };

    // Some click events
    this.onSignUp = this.onSignUp.bind(this);
    this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );
    this.onTextboxChangeFirstName = this.onTextboxChangeFirstName.bind(this);
    this.onTextboxChangeLastName = this.onTextboxChangeLastName.bind(this);
    this.onTextboxChangePasswordConfirm = this.onTextboxChangePasswordConfirm.bind(
      this
    );
    this.onTextboxChangeMailingListRegistration = this.onTextboxChangeMailingListRegistration.bind(
      this
    );
  }

  handleCaptchaChange(value) {
    if (value) this.setState({ captcha: value });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextboxChangeFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextboxChangeLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onTextboxChangePasswordConfirm(event) {
    this.setState({
      passwordConfirm: event.target.value,
    });
  }

  onTextboxChangeMailingListRegistration(event) {
    this.setState({
      mailingListRegistration: event.target.checked,
    });
  }

  onSignUp() {
    //Grab state
    const {
      captcha,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      passwordConfirm,
      mailingListRegistration,
    } = this.state;

    // Clearing the former error message
    this.setState({ signUpError: "", signUpSuccess: "" });

    // Some validations
    // if (!signUpEmail || !signUpPassword || !captcha)
    if (!signUpEmail || !signUpPassword)
      return this.setState({
        signUpError: "Invalid user data and/or captcha provided.",
      });

    const signUpEmailLower = signUpEmail.toLowerCase();
    this.setState({
      isLoading: true,
    });

    if (signUpPassword === passwordConfirm) {
      fetch(`${Constant.API_ENDPOINT}/user/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          captcha,
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmailLower,
          password: signUpPassword,
          subscribe: mailingListRegistration ? 1 : 0,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.message === "User Created") {
            this.setState({
              signUpSuccess:
                "Thank you for Joining us! A confirmation email was sent to you. Please check your Inbox, Junk, Spam, or Promotions folder.",
              isLoading: false,
              captcha: "",
              signUpEmail: "",
              signUpPassword: "",
              signUpFirstName: "",
              signUpLastName: "",
              passwordConfirm: "",
              mailingListRegistration: true,
            });
          } else {
            this.setState({
              signUpError: json.message,
              isLoading: false,
            });
          }
        });
    } else {
      alert("Password Fields Do Not Match!");
    }
    //Post request to backend
  }

  render() {
    const {
      isLoading,
      signUpSuccess,
      signUpError,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      passwordConfirm,
    } = this.state;

    return (
      <div className="Register">
        <h1 style={{ paddingTop: "150px" }}>SIGN UP</h1>
        <h3
          style={{
            fontWeight: "400",
            color: "#A9A9A9",
          }}
        >
          Be part of our community!
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
        <div>
          <div
            style={{
              fontWeight: "700",
            }}
          >
            LOGIN INFORMATIONS
          </div>
          <div className="SignupInput">
            <input
              type="text"
              placeholder="First Name"
              value={signUpFirstName}
              onChange={this.onTextboxChangeFirstName}
            />
            <br />
          </div>
          <div className="SignupInput">
            <input
              type="text"
              placeholder="Last Name"
              value={signUpLastName}
              onChange={this.onTextboxChangeLastName}
            />
            <br />
          </div>
          <div className="SignupInput">
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            />
            <br />
          </div>
          <div className="SignupInput">
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            />
            <br />
          </div>
          <div className="SignupInput">
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={this.onTextboxChangePasswordConfirm}
            />
            <br />
          </div>
          <div className="SignupInput">
            <label>
              <input
                style={{ width: "auto" }}
                type="checkbox"
                defaultChecked={this.state.mailingListRegistration}
                onChange={this.onTextboxChangeMailingListRegistration}
              />{" "}
              &nbsp; Sign me up for DOUHAVE Picker Contests, News, and
              Nationwide Thrifting Insights!
              <br />
            </label>
          </div>
          <br />

          <div className="register-recaptcha-text">
            This site is protected by reCaptcha Enterprise and the Google{" "}
            <a
              href="https://policies.google.com/privacy?hl=en-US"
              target="_blank"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms?hl=en-US"
              target="_blank"
            >
              Terms of Service
            </a>{" "}
            apply.
          </div>
          <br />

          {isLoading ? (
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
            <>
              {signUpSuccess ? (
                <Alert
                  color="success"
                  style={{ border: "double", fontWeight: "bolder" }}
                >
                  {signUpSuccess}
                </Alert>
              ) : null}
              {signUpError ? (
                <p
                  style={{
                    border: "double",
                    color: "red",
                    fontWeight: "bolder",
                  }}
                >
                  {signUpError}
                </p>
              ) : null}
            </>
          )}

          {/* <div className='douhave-captcha'>
            <ReCAPTCHA sitekey={Constant.CAPTCHA_CLIENT_KEY} onChange={this.handleCaptchaChange} />
          </div> */}
        </div>
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            marginTop: "20px",
            marginBottom: "70px",
            cursor: "pointer",
          }}
          onClick={this.onSignUp}
        >
          <img
            style={{
              height: "40px",
              width: "100px",
            }}
            src={SubmitButton}
            alt="Submit"
          />
        </button>
      </div>
    );
  }
}

export default Register;
