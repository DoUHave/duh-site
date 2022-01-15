import React, { Component } from 'react';
import CatResults from './CatResults.js';
import EmailConfirmationBox from './EmailConfirmationBox.js';
import Search from './SearchResults.js';


class WhatPeopleNeed extends Component {

  constructor (props) {
    super(props);

    this.state = {
      category: '',
    };

    //this.changeCategory = this.changeCategory.bind(this);
  }

  render() {
    const {
      category
    } = this.state;

    let isAuth = this.props.isAuth;
    let userName = this.props.userName;
    let firstName = this.props.firstName;
    let userId = this.props.userId;
    let token = this.props.token;
    let zipCode = this.props.zipCode;
    let distance = this.props.distance;

    return (
      <div className="WhatPeopleNeed">
        <EmailConfirmationBox />
        
        <CatResults category={category} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} token={token} zipCode={zipCode} distance={distance} />
      </div>
    );
  }
}

export default WhatPeopleNeed;
