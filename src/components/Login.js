import React, { Component } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import "whatwg-fetch";
import UserService from "../services/UserService";
import Constant from "../util/Constant";
import { removeCookie, setCookie } from "../util/storage";

class Login2 extends Component {
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

  onSignIn(event) {
    if (event) event.preventDefault();
    const { signInEmail, signInPassword } = this.state;

    const signInEmailLower = signInEmail.toLowerCase();

    this.setState({
      loading: true,
      signInError: "",
    });

    //Post request to backend
    fetch(`${Constant.API_ENDPOINT}/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: signInEmailLower,
        password: signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
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
            email: json.email,
            profilePic: json.profilePic || "",
            permissions: json.permissions || [],
            emailConfirmed: json.emailConfirmed || false,
            isAuth: true,
          };
          this.setState(userSession);
          UserService.setUser(userSession);

          // We redirect to the home page if we sign in from the forgot password view
          if (window.location.pathname.indexOf("forgotPassword") !== -1) {
            window.location = "/WhatPeopleNeed";
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
      });
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
      <div className="Login">
        <Modal
          isOpen={this.state.modal}
          toggle={() => {
            this.closeModal();
          }}
        >
          <ModalHeader> LOGIN </ModalHeader>
          <ModalBody>
            {!isAuth ? (
              !this.state.loading && !this.state.token ? (
                <>
                  <Form onSubmit={(e) => this.onSignIn(e)}>
                    <FormGroup row>
                      <Label for="emailField" sm={2}>
                        Email
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="email"
                          name="email"
                          id="emailField"
                          placeholder="Email"
                          value={signInEmail}
                          onChange={this.onTextboxChangeSignInEmail}
                          onKeyPress={this.onKeyPress}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="passwordField" sm={2}>
                        Password
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="password"
                          name="password"
                          id="passwordField"
                          placeholder="Password"
                          value={signInPassword}
                          onChange={this.onTextboxChangeSignInPassword}
                          onKeyPress={this.onKeyPress}
                        />
                      </Col>
                    </FormGroup>

                    <div className="text-danger text-center">
                      {this.state.signInError}
                    </div>
                    <br />
                    <div className="text-info text-left">
                      <a href="/forgotPassword">Forgot Password?</a>
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
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              disabled={!this.state.signInEmail || !this.state.signInPassword}
              onClick={() => {
                this.onSignIn();
              }}
            >
              Submit
            </Button>
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
    );
  }
}

export default Login2;
