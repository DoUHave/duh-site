import React, { Component } from "react";
import { BiUser } from "react-icons/bi";
import {
  FaComment,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import MultilevelSidebar from "react-multilevel-sidebar";
import "react-multilevel-sidebar/src/Sidebar.css";
import { removeCookie } from "../util/storage";

let authOptions = [
  {
    content: [
      {
        id: 31,
        name: "Profile Settings",
        icon: <FaUserAlt />,
        to: "/userpanel",
      },
      { id: 32, name: "  Messages", icon: <FaComment />, to: "/messages" },
      {
        id: 33,
        name: "Logout",
        icon: <FaSignOutAlt />,
        onItemClick: { removeCookie },
      },
    ],
  },
];
let unAuthOptions = [
  {
    content: [
      { id: 33, name: "  Signup", icon: <FaSignInAlt />, to: "/Register" },
      { id: 34, name: "  Login", icon: <FaSignInAlt />, to: "/Signin" },
    ],
  },
];

class UserDrawer extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  //   you can also use this function on any of your event to open/close the sidebar
  handleSidebarToggle = (isOpen) => {
    this.setState({ isOpen });
  };

  handleClick = (itemOptions) => {
    if(itemOptions.name=='Logout'){
      removeCookie()
    }
    /* 
            do something with the item you clicked.
            you can also send custom properties of your choice
            in the options array you'll be getting those here
            whenever you click that item
        */
  };

  render() {
    let isAuth = this.props.isAuth;
    return (
      <div>
        <MultilevelSidebar
          open={this.state.isOpen}
          onToggle={this.handleSidebarToggle}
          options={isAuth ? authOptions : unAuthOptions}
          header="User Controls"
          onItemClick={this.handleClick}
        />
        {/* {
                    isAuth &&
                    <button onClick={removeCookie}> <FaSignOutAlt /> Logout</button>
                } */}

        {/* using in our button to open the sidebar */}
        <button
          style={{ background: "none", border: "none", outline: "none" }}
          onClick={() => this.handleSidebarToggle(true)}
        >
          <BiUser className="profile-icon" />
        </button>
      </div>
    );
  }
}

export default UserDrawer;
