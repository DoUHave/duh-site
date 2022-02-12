import React, { Component } from "react";
import { Form, Spinner } from "reactstrap";
import "whatwg-fetch";
import SubmitButton from "../img/Button- Submit.png";
import UserService from "../services/UserService";
import { removeCookie, setCookie } from "../util/storage";
import ApiService from '../services/ApiService.js';
import ItemService from "../services/ItemService";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modal: this.props.modal || false,
      signInError: "",
      signInEmail: "",
      signInPassword: "",
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {}

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  /**
   * Sending the login action on enter key pressed
   * @param {*} e
   */
  onKeyPress = (e) => {
    if (e.which === 13 && this.state.signInEmail && this.state.signInPassword) {
      this.onSignIn();
    }
  };

  async onSignIn(event) {
    if (event) event.preventDefault();
    const { signInEmail, signInPassword } = this.state;

    const signInEmailLower = signInEmail.toLowerCase();

    this.setState({
      loading: true,
      signInError: "",
    });

    //Post request to backend
    let params = {
      email: signInEmailLower,
      password: signInPassword,
    };

    let json = await ApiService.login(params);

    if (json.message === "Auth Successful") {
      setCookie({ token: json.token });
      const userSession = {
        signInError: "",
        loading: false,
        signInEmail: "",
        signInPassword: "",
        token: json.token,
        userId: json.userId,
        userName: json.userName,
        firstName: json.firstName,
        profilePic: json.profilePic || "",
        email: json.email,
        permissions: json.permissions || [],
        emailConfirmed: json.emailConfirmed || false,
        isAuth: true,
      };
      this.setState(userSession);
      UserService.setUser(userSession);
      ItemService.getSavedItems(userSession.userId);
      
      // We redirect to the home page if we sign in from the forgot password view
      if (window.location.pathname.indexOf("forgotPassword") !== -1) {
        window.location = "/";
      } else {
        window.location.reload();
        window.location = "/WhatPeopleNeed";
      }
    } else {
      this.setState({
        signInError: json.message,
        loading: false,
      });
    }
  }

  onLogout() {
    removeCookie();
  }

  closeModal() {
    this.setState({ modal: false });
  }

  render() {
    const { signInEmail, signInPassword } = this.state;

    const isAuth = UserService.isConnected();

    return (
      <div className="Register text-center">
        <div>
          <h1 style={{ paddingTop: "150px" }}>SIGN IN</h1>
          <h3 style={{ fontWeight: "400", color: "#A9A9A9" }}>
            Enter your Username and Password to Login
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
          <div style={{ fontWeight: "700" }}>LOGIN INFORMATION</div>
        </div>

        <div>
          {!isAuth ? (
            !this.state.loading && !this.state.token ? (
              <>
                <Form onSubmit={(e) => this.onSignIn(e)}>
                  <div className="SignupInput">
                    <input
                      type="email"
                      name="email"
                      id="emailField"
                      placeholder="Email"
                      value={signInEmail}
                      onChange={this.onTextboxChangeSignInEmail}
                      onKeyPress={this.onKeyPress}
                    />
                    <br />
                  </div>
                  <div className="SignupInput Register">
                    <input
                      type="password"
                      name="password"
                      id="passwordField"
                      placeholder="Password"
                      value={signInPassword}
                      onChange={this.onTextboxChangeSignInPassword}
                      onKeyPress={this.onKeyPress}
                    />
                    <br />
                  </div>

                  <div className="text-danger">{this.state.signInError}</div>
                  <br />
                  <div className="text-info">
                    <a href="/forgotPassword">Forgot Password? Reset Now</a>
                  </div>
                </Form>
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
            )
          ) : null}
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              marginTop: "30px",
              marginBottom: "70px",
              cursor: "pointer",
            }}
            disabled={!this.state.signInEmail || !this.state.signInPassword}
            onClick={() => {
              this.onSignIn();
            }}
          >
            <img
              style={{ height: "40px", width: "100px" }}
              src={SubmitButton}
              alt="Submit"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Login;