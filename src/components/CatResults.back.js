import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import LikeIcon from "../img/Heart- Light Grey.png";
import MessageIcon from "../img/Message- Light Grey.png";
import ItemBackground from "../img/Post Box.png";
import ShareIcon from "../img/Share- Light Grey.png";
import Constant from "../util/Constant";
import Categories from "./Categories";
import OfferSubmit from "./OfferSubmit";
import SaveItem from "./SaveItem";

class CatResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      models: [],
      category: this.props.category,
      showItem: false,
      singleResult: "",
      showResults: true,
      selectedItem: {},
      closed: true,
      clickToShow: false,
      showOfferSubmit: false,
      showSaveItem: false,
      token: this.props.token,
    };
    this.onItemFull = this.onItemFull.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.onOfferSubmit = this.onOfferSubmit.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    const {
      isLoaded,
      models,
      showItem,
      singleResult,
      //category
    } = this.state;

    let category = this.props.category;

    fetch(`${Constant.API_ENDPOINT}/items/${category}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          this.setState({
            isLoaded: true,
            models: json.items,
          });
        } else {
          this.setState({
            isLoaded: false,
          });
        }
      });
  }

  changeCategory(cat) {
    this.setState({
      category: cat,
      showResults: false,
    });

    const {
      isLoaded,
      models,
      showItem,
      singleResult,
      //category
    } = this.state;

    let category = cat;
    fetch(`${Constant.API_ENDPOINT}/items/${category}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          this.setState({
            isLoaded: true,
            models: json.items,
          });
        } else {
          this.setState({
            isLoaded: false,
          });
        }
      });
  }

  onItemFull(id) {
    this.setState({
      singleResult: id,
      showItem: true,
      closed: false,
    });
  }

  onClickToShow = () => {
    const { clickToShow, showSaveItem } = this.state;
    this.setState({
      showSaveItem: false,
    });
    if (!clickToShow) {
      this.setState({
        clickToShow: true,
      });
    } else {
      this.setState({
        clickToShow: false,
      });
    }
  };

  onOfferSubmit = (id) => {
    const { showOfferSubmit, singleResult } = this.state;
    if (singleResult !== "" && singleResult !== id) {
      this.setState({
        singleResult: id,
        showOfferSubmit: true,
      });
    } else {
      if (!showOfferSubmit) {
        this.setState({
          singleResult: id,
          showOfferSubmit: true,
        });
      } else {
        this.setState({
          showOfferSubmit: false,
          singleResult: "",
        });
      }
    }
  };

  onSaveItem = (id) => {
    const { showSaveItem, singleResult, clickToShow } = this.state;
    this.setState({
      showItem: false,
      clickToShow: false,
    });

    if (singleResult !== "" && singleResult !== id) {
      this.setState({
        singleResult: id,
        showSaveItem: true,
      });
    } else {
      if (!showSaveItem) {
        this.setState({
          singleResult: id,
          showSaveItem: true,
        });
      } else {
        this.setState({
          showSaveItem: false,
          singleResult: "",
        });
      }
    }
  };

  onCancel() {
    this.setState({
      showSaveItem: false,
    });
  }

  onClose() {
    this.setState({
      showItem: false,
    });
  }

  render() {
    const {
      isLoaded,
      models,
      category,
      showItem,
      singleResult,
      showResults,
      closed,
    } = this.state;

    let isAuth = this.props.isAuth;
    let userName = this.props.userName;
    let firstName = this.props.firstName;
    let userId = this.props.userId;
    let token = this.props.token;

    return (
      <div className="CatResults">
        <h1 style={{ paddingTop: "20px", marginBottom: "0px" }}>DO YOU HAVE</h1>
        <h3
          style={{
            fontWeight: "400",
            color: "#A9A9A9",
          }}
        >
          What people are looking for?
        </h3>
        <Categories />
        <hr
          style={{
            backgroundColor: "#000000",
            width: "85%",
            marginBottom: "0.5rem",
          }}
        />
        <hr
          style={{
            backgroundColor: "#000000",
            width: "70%",
            marginTop: "0rem",
          }}
        />

        <div className="categoryResults">
          {models.map((model) => (
            <div className="resultItem" key={model._id}>
              <img
                style={{ maxWidth: "350px", height: "300px" }}
                src={ItemBackground}
                alt="Logo"
              />
              <div
                style={{
                  position: "absolute",
                  top: "11px",
                  left: "13%",
                  width: "78%",
                }}
                className="itemRow"
              >
                <div style={{ Width: "155%" }} id="rowContainer">
                  <div id="itemPic">
                    <Link
                      to={{
                        pathname: `/item/${model._id}`,
                        state: { item: model },
                      }}
                    >
                      <img
                        src={model.itemImg.substring(
                          model.itemImg.lastIndexOf("/") - 17,
                          model.itemImg.length
                        )}
                      />{" "}
                    </Link>
                  </div>

                  <Container className="w-100" style={{ paddingTop: "10%" }}>
                    <Row>
                      <Col id="itemName">{model.name}</Col>
                      <Col id="itemBudget">
                        $
                        {model.budget.toLocaleString(navigator.language, {
                          minimumFractionDigits: 0,
                        })}
                      </Col>
                    </Row>
                    <Row>
                      <Col id="itemCategory">{model.category} </Col>
                      <Col id="itemLocation">
                        {model.location}, {model.locationState}
                      </Col>
                    </Row>
                  </Container>
                </div>
                <hr
                  style={{
                    backgroundColor: "#000000",
                    marginLeft: "5%",
                    paddingLeft: "50%",
                    width: "39%",
                  }}
                />
                {//Save Item
                this.state.showSaveItem && singleResult === model._id ? (
                  <SaveItem model={model} onCancel={this.onCancel} />
                ) : null}
                {this.state.clickToShow ? (
                  //isAuth ? (<a href="/paymentFormLoader">Please Pay Minimal Fee</a>)
                  isAuth ? (
                    model.contactinfo
                  ) : (
                    <p>Please Log In</p>
                  )
                ) : null}

                <div className="buttonContainer">
                  <div className="share-button">
                    <img
                      className="share-button-img"
                      src={LikeIcon}
                      onClick={() => this.onSaveItem(model._id)}
                    />
                  </div>
                  <div className="save-button">
                    <img
                      className="save-button-img"
                      src={MessageIcon}
                      onClick={() => {
                        this.setState({
                          selectedItem: model,
                          showOfferSubmit: true,
                        });
                      }}
                    />
                  </div>
                  <div className="contact-button">
                    <img className="contact-button-img" src={ShareIcon} />
                  </div>
                </div>
              </div>

              {
                //  <div className="offer-button">
                //    <button onClick={() => this.onOfferSubmit(model._id)}>Make Offer</button>
                //  </div>
              }

              {
                //Check if Logged in and fetch user data in component
                //If component does not get user data, return "Please Log In"
                //If Logged in, pass itemId, ownerId, component will have offerer id from fetch
              }
              {this.state.showOfferSubmit &&
              this.state.selectedItem._id === model._id ? (
                <OfferSubmit itemId={model._id} key={Date.now()} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CatResults;
