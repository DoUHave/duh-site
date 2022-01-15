import React, { Component } from 'react';
import CatResults from './CatResults.js';

class Moto extends Component {
  render() {
    return (
      <div className="Moto">
        <h1>Motorcycles, ATVs, and UTVs</h1>
        <CatResults category={'moto'}
                    isAuth={this.props.isAuth}
                    userName={this.props.userName}
                    firstName={this.props.firstName}
                    userId={this.props.userId}
                    token={this.props.token}
         />
      </div>
    );
  }
}

export default Moto;
