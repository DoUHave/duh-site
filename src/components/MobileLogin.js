import React, { Component } from "react";
import { BiConversation, BiBell } from "react-icons/bi";
import UserService from "../services/UserService";
import { removeCookie } from "../util/storage";
import DEFAULT_IMAGE from "../img/user3.jpg";
import Constant from "../util/Constant";
import OfferService from "../services/OfferService";
import { Badge } from "reactstrap";

class MobileLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      count: "",
    };
    this.onLoginIcon = this.onLoginIcon.bind(this);
    this.getAllItemOffers = this.getAllItemOffers.bind(this);
  }
  componentDidMount() {
    this.getAllItemOffers();
  }
  getAllItemOffers = async () => {
    const offer = await OfferService.getItemsOffers();
    this.setState({ count: offer.count });
  };

  onLoginIcon = () => {
    if (this.state.showLogin) {
      this.setState({
        showLogin: false,
      });
    }

    this.setState({
      showLogin: true,
    });
  };

  onLogout() {
    removeCookie();
  }

  render() {
    const isAuth = UserService.isConnected();
    const { userName, firstName, profilePic } =
      UserService.getUserSessionDetails() || {};
    return (
      <div className="MobileLogin">
        {!isAuth ? (
          <div className="registerText">
            <a
              style={{ color: "#000000", textDecoration: "none" }}
              href="/Register"
            >
              SIGN UP
            </a>
            <div className="space-break" />
          </div>
        ) : null}
        {!isAuth ? (
          <div className="registerText">
            <a
              style={{ color: "#000000", textDecoration: "none" }}
              href="/Signin"
            >
              SIGN IN
            </a>
            <div className="space-break" />
          </div>
        ) : null}
        {/* {
          (!isAuth) ? (
            <div className="mobile-login-box">
              <div className="signInText cursor-pointer" onClick={this.onLoginIcon}>
                <span
                  style={{ color: '#000000' }}>SIGN IN</span>
              </div>
              {
                this.state.showLogin ? (
                  <Login isAuth={isAuth} userName={userName} firstName={firstName} modal={true} key={Date.now()} />
                  ) : null
              }
            </div>
            ) : (null)
        } */}
        {isAuth ? (
          <div className="mobile-login-box">
            <p>
              <a
                href="/messages"
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <BiConversation className="profile-icon" />
                <Badge
                  style={{ position: "absolute", right: 0 }}
                  color="danger"
                >
                  {this.state.count !== 0 && this.state.count}
                </Badge>
              </a>

              <a style={{ color: "#000000" }} href="/userpanel">
                {/* <BiUserCircle className="profile-icon" /> */}
                <img
                  alt=""
                  src={profilePic ? profilePic : DEFAULT_IMAGE}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50px",
                  }}
                />
                Welcome, {firstName}!
              </a>
              {/* <BsCaretDownFill className="profile-icon"/> */}
            </p>
            <a style={{ color: "#000000" }} href="#" onClick={this.onLogout}>
              Logout
            </a>

            <br />
          </div>
        ) : null}
      </div>
    );
  }
}

export default MobileLogin;
