import React, { Component } from 'react';
import CatResults from './CatResults.js';


class Misc extends Component {
  render() {
    return (
      <div className="Misc">
        <h1>Everything Else</h1>
        <CatResults category={'misc'}
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

export default Misc;
