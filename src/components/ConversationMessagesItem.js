import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import { BiUserCircle } from "react-icons/bi";
import { timeSince } from "../util/helper";
import UserService from "../services/UserService";
import LinkPreview from './linkPreview/LinkPreview';

// If you're using built in layout, you will need to import this css
// import '@ashwamegh/react-link-preview/dist/index.css'

/**
 * ConversationMessagesItem view component
 * Showing a specific messageData
 * @author dassiorleando
 */
class ConversationMessagesItem extends Component {

  constructor (props) {
    super(props);
    this.state = { links: [] };
    this.links = [];
  }

  replacer (addProtocol, $1, $2) {
    // Well-formatted url to show.
    const url = `${addProtocol ? 'http://' + $2 : $1}`;
    this.links.push(url.replace(/\/$/, ''));
    return `${addProtocol ? $1 : ''}<a href="${url}" target="_blank">${addProtocol ? $2 : $1}</a>`;
  }

  /**
   * Transforms text links/emails to HTML elements.
   * @param {*} inputText 
   */
  linkify(inputText) {
    const self = this;
    if (!inputText) return "";
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, function (url) {
      return self.replacer(false, RegExp.$1);
    });

    // URLs starting with "www."
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, function (url, ) {
      return self.replacer(true, RegExp.$1, RegExp.$2);
    });

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
  }

  /**
   * Processing the message to handle Hyperlink.
   * @param {*} messageData 
   */
  processingMessage(messageData) {
    if (!messageData.formatted) {
      messageData.message = this.linkify(messageData.message);
      messageData.formatted = true;
    }
    return messageData;
  }

  render() {
    const actors = this.props.actors;
    // const messageData = this.processingMessage(this.props.messageData);
    const userInfo = UserService.getUserSessionDetails();
    const userId = userInfo.userId || userInfo._id;
    if (!userId) window.location = '/';

    // Only admin can benefit from hyperlink for now.
    const messageData = userInfo.permissions.indexOf('ADMIN') !== -1 ? this.processingMessage(this.props.messageData) : this.props.messageData;

    return (
      <div className="ConversationMessagesItem">
        { messageData
          ? <Col xs="12" className={ messageData.from === userId ? 'float-right text-right' : 'float-left text-left' }>
              <Row>
                {
                  messageData.from !== userId
                  ? 
                    <Col xs="2">
                      <BiUserCircle className="conversation-messages-item-icon"/>
                    </Col>
                  : <></>
                }

                <Col xs="10" className="p-0">
                  <Row style={{ display: "inline" }}>
                    <Col xs="12" className={ messageData.from === userId ? 'text-right p-0' : 'text-left p-0' }> { timeSince(messageData.date) } ago </Col>
                    <Col xs="12" className="text-left p-0">
                      <div className={ messageData.from === userId ? 'chat-message float-right' : 'chat-message float-left' } style={{ display: "inline-block", hyphens: "auto", maxWidth: "100%" }} dangerouslySetInnerHTML={{ __html: messageData.message }} />
                    </Col>
                    <br/>
                    <Col xs="12">
                      {
                        this.links.map((link, index) => (
                          <LinkPreview key={index} url={link}/>
                        ))
                      }
                    </Col>
                  </Row>
                </Col>

                {
                  messageData.from === userId
                  ? 
                    <Col xs="2">
                      <BiUserCircle className="conversation-messages-item-icon"/>
                    </Col>
                  : <></>
                }
              </Row>
            </Col>
          : <div></div>
        }
      </div>
    );
  }
}

export default ConversationMessagesItem;
