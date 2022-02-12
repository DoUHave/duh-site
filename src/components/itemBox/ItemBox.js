import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SaveItem from '../SaveItem.js';
import UserService from '../../services/UserService.js';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './ItemBox.css';
import Constant from '../../util/Constant';
/**
 * Represendint an item box
 * @author dassiorleando
 */
class ItemBox extends Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);

    this.confirmationEmailWarning = 'You must be logged in with a confirmed email address to favorite an item. Please login and verify your email.';
  }

  onSaveItem = id => {
    console.log(`onSaveItem: ${ id }`);
    
    this.isFavorited(id).then( alreadySaved => {
      if (alreadySaved) {
        this.setState({ showSaveItem: false });

        // TODO: Need to remove the favorite here
        return;
      } 
      
      let isAuth = UserService.isConnected();
      const { emailConfirmed } = UserService.getUserSessionDetails() || {};
      
      if (isAuth && !emailConfirmed) {
        alert(this.confirmationEmailWarning);
      } else {
        this.onSave();
        this.setState({ showSaveItem: true });
      }
    });
  };
    
  onSave() {
    
    const item = this.props.item;
    console.log(`onSave: ${ item }`);
    const { token, firstName, userId } =
      UserService.getUserSessionDetails() || {};

    fetch(`${Constant.API_ENDPOINT}/savelist`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId: item._id,
        name: item.name,
        itemImg: item.itemImg,
        budget: item.budget,
        category: item.category,
        condition: item.condition,
        location: item.location,
        locationState: item.locationState,
        submittedby: item.submittedby,
        submittedby1: item.submittedby1,
        savedby: firstName,
        savedby1: userId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('Saved it!');
        if (json.message === 'List Saved') {
          window.location.reload();
        } else {
          alert(json.message || (json.error && json.error.message) || '');
        }
      });
  }
  render() {
    // The item/post to show
    const item = this.props.item;
    const showSaveItem = this.props.showSaveItem === false || !UserService.isConnected() ? false : true;

    return (
      <div className='box-alt'>
        <Link to={{
            pathname: `/item/${item.itemId ? item.itemId : item._id}`,
            state: { item } }}>
          
          <div className='img-box-alt'>
            <LazyLoadImage
                alt='Image alt'
                src={
                  item.itemImg.startsWith('http')
                    ? item.itemImg
                    : item.itemImg.substring(
                        item.itemImg.lastIndexOf('/') - 17,
                        item.itemImg.length
                      )
                }
            />
          </div>
          <div className='product-name-alt flex-column'>
            <p className='product-text-alt text-uppercase DoUHave'>Do U Have A...</p>
            <p className='product-text-alt'>{item.name}</p>
          </div>
          <div className='product-bud-alt'>
            <p>BUDGET</p>
          </div>
          <div className='product-price-alt '>
            <p>${ item.budget.toLocaleString(navigator.language, {minimumFractionDigits: 0}) }</p>
          </div>
          <div className='product-cat-alt'>
            <p>{item.category}</p>
            <p>{item.location}, {item.locationState}</p>
          </div>
        </Link>
        { showSaveItem ? (<hr style={{ margin: '10px 0' }} />) : (<></>) }
        { showSaveItem ? (<div className='product-option-alt'>
            <SaveItem
              key={item._id}
              model={item}
              onCancel={this.onCancel}
            />
        </div>)
        :
        (<></>)
      }
      </div>
    );
  }
}

export default ItemBox;
