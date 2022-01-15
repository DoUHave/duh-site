import React, { Component } from 'react';
import NeedForm from './NeedForm.js';
import UserService from '../services/UserService.js';
import Login from './Signin.js';

class WhatYouNeed extends Component {
  render() {
    let isAuth = UserService.isConnected();
    let firstName = this.props.firstName;
    let userName = this.props.userName;
    let userId = this.props.userId;
    let token = this.props.token;
    let email = this.props.email;

    if (isAuth) {
      return (
        <div className="WhatYouNeed">
          <div className="WhatYouNeedHeaders">
            <h1 style={{ paddingTop: '150px' }}>WHAT ARE YOU LOOKING FOR?</h1>
            <h3 style={{
              fontWeight: '400',
              color: '#A9A9A9'
            }}>Create a post listing the item you're in search of.</h3>

          </div>
          <hr style={{
            backgroundColor: '#000000',
            width: '55%',
            marginBottom: '0.5rem'
          }} />
          <hr style={{
            backgroundColor: '#000000',
            width: '50%',
            marginTop: '0rem'
          }} />
          <NeedForm email={email} userName={userName} firstName={firstName} userId={userId} token={token} />
        </div>
      )
    } else {
      return (
        <h1 style={{ textAlign: 'center', paddingTop: '275px' }}>Please <a href="/signin" style={{ color: '#E3A62D' }}>Log In</a></h1>
      );
    }

  }
}

export default WhatYouNeed;
