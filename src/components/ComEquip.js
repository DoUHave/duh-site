import React, { Component } from 'react';
import CatResults from './CatResults.js';


class ComEquip extends Component {
  render() {
    return (
      <div className="ComEquip">
        <h1>Commercial and Restaurant Equipment</h1>
        <CatResults category={'comequip'}
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

export default ComEquip;
