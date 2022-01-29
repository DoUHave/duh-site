import React, { Component } from 'react';
import { withRouter } from '../util/withRouter.js'
import { Col, Container, Row } from 'reactstrap';
import OfferSubmit from '../components/OfferSubmit.js';
import ShareBox from '../components/ShareBox.js';
import ContactBuyerImgGold from '../img/Contact-Buyer-Gold.png';
import ShareImgGold from '../img/Share-Gold.png';
import ItemService from '../services/ItemService.js';
import UserService from '../services/UserService.js';
import AdsBar from '../components/AdsBar.js';

/**
 * Item details component
 * It shows an item information plus action buttons
 * @author dassiorleando
 */
class ItemDetails extends Component {
  startRef = React.createRef();
  
  constructor(props) {
    super(props);
    
    this.itemToShow = {};
    this.state = {
      itemToShow: {},
      showOfferSubmit: false,
      showShareModal: false,
    };
    this.itemId = props.params.id;
      //this.props.match &&
      //this.props.match.params &&
      //this.props.match.params.itemId;
    this.confirmationEmailWarning =
      'Please confirm your email address with the instructions on the home page.';
  }

  /**
   * Once the component is mounted we get the item from the location state or from the API as fallback
   */
  async componentDidMount() {
    let itemToShow =
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.item) ||
      this.props.item ||
      {};
    // If the item isn't provided into the location state we fetch it using its id if present
    if (!itemToShow._id && this.itemId) {
      this.setState({ loading: true });
      try {
        itemToShow = await ItemService.findById(this.itemId);
      } catch (error) {}
    }
    this.setState({ loading: false, itemToShow });
    this.startRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Offer sent callback
   */
  offerSentCallback(sent, message) {
    if (sent) {
      alert(
        'Offer saved successfully, please check your panel to access the chat space.'
      );
    } else {
      alert(message);
    }
    this.setState({ showOfferSubmit: false });
  }

  modalClosed(isShareModal = false) {
    if (isShareModal) {
      this.setState({ showShareModal: false });
    } else {
      this.setState({ showOfferSubmit: false });
    }
  }

  /**
   * Contact buyer button.
   * Only confirmed account can call this function.
   */
  contactBuyer() {
    let isAuth = UserService.isConnected();
    const { emailConfirmed } = UserService.getUserSessionDetails() || {};
    if (isAuth && !emailConfirmed) {
      alert(this.confirmationEmailWarning);
    } else {
      this.setState({ showOfferSubmit: true });
    }
  }

  render() {
    // let isAuth = UserService.isConnected();
    let itemToShow = this.state.itemToShow;

    return (
      <div className={`${this.props.showAsBox ? '' : 'ItemToShow'}`}>
        
        <div ref={this.startRef} className='w-50' />
        {itemToShow._id ? (
          <>
            {this.props.showAsBox ? (
              <>
                <a
                  href={`/item/${
                    itemToShow.itemId ? itemToShow.itemId : itemToShow._id
                  }`}
                  target='_blank'>
                  <img
                    className='block-center w-50 mb-20 m-width'
                    src={
                      itemToShow.itemImg.startsWith('http')
                        ? itemToShow.itemImg
                        : itemToShow.itemImg.substring(
                            itemToShow.itemImg.lastIndexOf('/') - 17,
                            itemToShow.itemImg.length
                          )
                    }
                  />
                </a>

                <a
                  href={`/item/${
                    itemToShow.itemId ? itemToShow.itemId : itemToShow._id
                  }`}
                  target='_blank'>
                  <h5 className='text-left'>
                    {' '}
                    {itemToShow.name} | $
                    {itemToShow.budget.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0,
                    })}
                  </h5>
                </a>

                <div className='text-left text-capitalize'>
                  {itemToShow.location}, {itemToShow.locationState}
                </div>

                <div className='text-left'>
                  Posted on the{' '}
                  {new Date(itemToShow.createdAt).toLocaleString()}
                </div>

                {/* <div className="text-left">
                    By <span className="text-capitalize">{itemToShow.submittedby}</span> | {isAuth ? (itemToShow.contactinfo) : "Log In to see his phone"}
                  </div> */}

                <hr />

                <div className='mt-20 text-justify' style={{ hyphens: 'auto' }}>
                  {itemToShow.description}
                </div>
              </>
            ) : (
              <Container className='w-100' style={{ padding: '10% 0' }}>
                <Row>
                  <Col>
                  <p className='product-text-alt text-uppercase DoUHave text-center d-block w-100 font-weight-bold'>
                    Do U Have A...
                  </p>
                  <h5 className='text-center'>
                    {itemToShow.name} | $
                    {itemToShow.budget.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0,
                    })}
                  </h5>
                  <br />
                  </Col>
                </Row>

                <Row className='mb-20 text-capitalize'>
                  <Col className='text-center'>{itemToShow.category} </Col>
                  <Col className='text-center'>
                    {itemToShow.location}, {itemToShow.locationState}
                  </Col>
                </Row>
                <Row>
                <Col><AdsBar/></Col>
                <Col>
                  <img
                    style={{ maxWidth: "30vw", height: "auto" }}
                    className='ItemDetailImage'
                    src={
                      itemToShow.itemImg.startsWith('http')
                        ? itemToShow.itemImg
                        : itemToShow.itemImg.substring(
                            itemToShow.itemImg.lastIndexOf('/') - 17,
                            itemToShow.itemImg.length
                          )
                    }
                  />
                  <p>{ itemToShow.description }</p>
                  </Col>
                  <Col><AdsBar/></Col>
                </Row>

                <Row className='mb-20'>
                  <Col className='text-center m-20'>
                    {' '}
                    <b>SUBMITTED</b>{' '}
                    {new Date(itemToShow.createdAt).toLocaleString()}{' '}
                  </Col>
                </Row>

                <Row className='item-buttons mb-20'>
                  <Col className='text-center'>
                    <button
                      onClick={() => {
                        this.contactBuyer();
                      }}
                      style={{ border: 'none', background: 'none' }}>
                      <img
                        src={ContactBuyerImgGold}
                        alt='Contact buyer for the item.'
                        style={{ height: '55px', width: 'auto' }}
                      />
                    </button>
                  </Col>
                  <Col className='text-center'>
                    <button
                      onClick={() => {
                        this.setState({ showShareModal: true });
                      }}
                      style={{ border: 'none', background: 'none' }}>
                      <img
                        src={ShareImgGold}
                        alt='Share item on social media.'
                        style={{ height: '55px', width: 'auto' }}
                      />
                    </button>
                  </Col>
                </Row>

                {this.state.showOfferSubmit ? (
                  <OfferSubmit
                    itemId={itemToShow._id}
                    submitter={itemToShow.submittedby1}
                    key={Date.now()}
                    onClosed={() => {
                      this.modalClosed(false);
                    }}
                  />
                ) : (
                  <></>
                )}

                {this.state.showShareModal ? (
                  <ShareBox
                    title={itemToShow.name}
                    description={itemToShow.description}
                    img={
                      itemToShow.itemImg.startsWith('http')
                        ? itemToShow.itemImg
                        : `https://${
                            window.location.host
                          }${itemToShow.itemImg.substring(
                            itemToShow.itemImg.lastIndexOf('/') - 17,
                            itemToShow.itemImg.length
                          )}`
                    }
                    link={`https://${window.location.host}/item/${
                      itemToShow._id
                    }`}
                    key={
                      Date.now()
                    }
                    onClosed={() => {
                      this.modalClosed(true);
                    }}
                  />
                ) : (
                  <></>
                )}
              </Container>
            )}
          </>
        ) : (
          <div />
        )}
        
      </div>
    );
  }
}

export default withRouter(ItemDetails);
