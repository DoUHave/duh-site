import React, { Component } from 'react';
import CatResults from './CatResults.js';


class HomeService extends Component {
  render() {
    return (
      <div className="HomeService">
        <h1>Home Services</h1>
        <CatResults category={'homeservice'}
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

export default HomeService;
