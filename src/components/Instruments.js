import React, { Component } from 'react';
import CatResults from './CatResults.js';

class Instruments extends Component {
  render() {
    return (
      <div className="Instruments">
        <h1>Musical Instruments</h1>
        <CatResults category={'instrument'}
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

export default Instruments;
