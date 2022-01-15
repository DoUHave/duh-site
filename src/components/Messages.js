import React, { Component } from "react";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import ChatBox from "./ChatBox";

/**
 * Messages view
 * It shows all the messages related to a user (offerings and inquired)
 * @author dassiorleando
 */
class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };
  }

  render() {
    const tabClasses = {
      "1": "offerings-tab",
      "2": "inquired-tab",
    };

    // Keep the active tab event
    const toggle = (tab) => {
      this.setState({ activeTab: tab });
    };

    return (
      <div className="message-box">
        <div className="Messages">
          <Container className="w-100">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={`${tabClasses["1"]} ${
                    this.state.activeTab === "1" ? "active" : ""
                  }`}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Posted
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`${tabClasses["2"]} ${
                    this.state.activeTab === "2" ? "active" : ""
                  }`}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Inquired
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent
              activeTab={this.state.activeTab}
              className="mt-20 mb-20"
            >
              <TabPane tabId="1">
                <ChatBox type="offerings" key="offerings" />
              </TabPane>
              <TabPane tabId="2">
                <ChatBox type="inquired" key="inquired" />
              </TabPane>
            </TabContent>
          </Container>
        </div>
      </div>
    );
  }
}

export default Messages;
