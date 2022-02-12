import React, { Component } from "react";
import UserService from "../services/UserService";
import Constant from "../util/Constant";
import { FaHeart } from 'react-icons/fa';
import ItemService from '../services/ItemService';

class SaveItem extends Component { 
  constructor(props) {
    super(props);
    this.item = this.props.model;
    
    // set heart color
    this.favorited = false;
    this.isFavorited().then(favorited => {
      if (favorited) {
        this.favorited = true;
        this.forceUpdate();
      }
    });
    
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const { token, firstName, userId } = UserService.getUserSessionDetails() || {};

    //reset the cache before reloading
    ItemService.resetSavedItemsCache();
    
    fetch(`${Constant.API_ENDPOINT}/savelist`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId: this.item._id,
        name: this.item.name,
        itemImg: this.item.itemImg,
        budget: this.item.budget,
        category: this.item.category,
        condition: this.item.condition,
        location: this.item.location,
        locationState: this.item.locationState,
        submittedby: this.item.submittedby,
        submittedby1: this.item.submittedby1,
        savedby: firstName,
        savedby1: userId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        
        if (json.message === "List Saved") {

        
          window.location.reload();
        } else {
          alert(json.message || (json.error && json.error.message) || "");
        }
      });
  }

  
  isFavorited() {
    //check to see if item id is in favorites list
    const { userId } = UserService.getUserSessionDetails() || {};
    return ItemService.checkSavedItems(userId,  this.item._id).then( result => {
      return result;
    });
  }

  render() {
    const isAuth = UserService.isConnected();

    return (
      <div className="SaveItem">
        { isAuth ?
          (<span className='icon-heart' onClick={() => this.onSave()}>
              <FaHeart color={ this.favorited ? '#ffbfbf' : '#bfbfbf' } />
              <p>{ this.favorited ? 'Saved Favorite!' : 'Add to Favorites' }</p>
          </span>)
          : 
          (<></>)
        }
      </div>
    )
  }
}

export default SaveItem;
