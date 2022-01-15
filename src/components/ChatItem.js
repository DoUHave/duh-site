import React, { Component } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Badge, Col, Row } from "reactstrap";
import OfferService from "../services/OfferService";

/**
 * Chat item
 * Item that shows chat rooms (discussions) for a type (posted or inquired)
 * @author dassiorleando
 */
class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = { offer: [] };
    this.getAllItemOffers = this.getAllItemOffers.bind(this);
  }
  componentDidMount() {
    this.getAllItemOffers();
  }
  //spcific item offers
  getAllItemOffers = async () => {
    const offer = await OfferService.getItemOffers(this.props.item._id);
    this.setState({ offer });
  };

  render() {
    const item = this.props.item;
    const type = this.props.type;
    const showAsBox = this.props.showAsBox;

    return (
      <div className={showAsBox ? "" : "ChatItem"}>
        <Row>
          <Col xs={showAsBox ? 6 : 2}>
            {/* Link that redirects to the item chat rooms */}
            <a href={`/chat_view/${item._id}/${type}`}>
              <img
                className="chatItemPic"
                src={
                  item.itemImg.startsWith("http")
                    ? item.itemImg
                    : item.itemImg.substring(
                        item.itemImg.lastIndexOf("/") - 17,
                        item.itemImg.length
                      )
                }
              />{" "}
            </a>
          </Col>
          <Col xs={showAsBox ? 6 : 10} className="p-0">
            <Row>
              <Col xs={showAsBox ? 12 : 6} className="text-left">
                <a href={`/chat_view/${item._id}/${type}`}>{item.name}</a>
              </Col>
              {showAsBox ? (
                <></>
              ) : (
                <Col xs="6" className="item-actions text-right">
                  {type === "offerings" ? (
                    <>
                      {/* <BsFillCapslockFill/> <ButtonToggle color="link"> Sell Faster </ButtonToggle> | <ButtonToggle color="link"> Mark Aquired </ButtonToggle> */}
                    </>
                  ) : (
                    <div />
                  )
                  // : <ButtonToggle color="link"> Arthive </ButtonToggle>
                  }
                </Col>
              )}
            </Row>
            <Row>
              {showAsBox ? (
                <Col xs="12" className="text-left">
                  $
                  {item.budget.toLocaleString(navigator.language, {
                    minimumFractionDigits: 0,
                  })}
                </Col>
              ) : (
                <Col xs="12" className="text-left">
                  {this.state.offer &&
                    this.state.offer
                      .slice(0, 6)
                      .map((index) => (
                        <BiUserCircle key={index} className="user-icon" />
                      ))}

                  <Badge color="secondary" className="chat-messages-badge">
                    {this.state.offer && this.state.offer.length > 6
                      ? `${this.state.offer.length}+`
                      : this.state.offer.length}
                  </Badge>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChatItem;
