import React, { Component } from 'react';
import CatResults from './CatResults.js';

class Furniture extends Component {
  render() {
    return (
      <div className="Furniture">
        <h1>Furniture</h1>
        <CatResults category={'furniture'}
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

export default Furniture;
