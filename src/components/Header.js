import React, { Component } from "react";
import PostButton from "../img/Button- Post It.png";
import Logo from "../img/image-logo.png";
import TopBarGold from "../img/Top Bar- Gold.png";
import Drawer from "./Drawer";
import Login from "./Login";
import MobileLogin from "./MobileLogin";
import UserDrawer from "./UserDrawer";
class Header extends Component {
  render() {
    let isAuth = this.props.isAuth;

    return (
      <>
        <div
          className="header-alt text-center"
          style={{ backgroundImage: `url('${TopBarGold}')` }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-4 d-flex justify-content-start align-items-center">
                <a className="btn-post-it" href="/WhatYouNeed">
                  <img className="post-btn-img" src={PostButton} alt="PostButton" />
                </a>
              </div>
              <div className="col-lg-4 col-4 d-flex justify-content-center align-items-center">
                <div className="">
                  <a href="/">
                    <img className="header-logo-img" src={Logo} alt="Logo" />
                  </a>
                  <p className="logo-text">POST . CONNECT . BUY</p>
                </div>
              </div>
              <div className="col-lg-4 col-4 d-flex justify-content-end align-items-center">
                <div className="drawer-toggle">
                  <Drawer />
                </div>
                <div className="drawer-toggle">
                  <UserDrawer isAuth={isAuth} />
                </div>
                {/* <div className="drawer-toggle">
                  <Login />
                </div> */}
                <div className="login-box">
                  <Login />
                </div>
                <div className="mobile-login">
                  <MobileLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
