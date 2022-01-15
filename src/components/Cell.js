import React, { Component } from 'react';
import CatResults from './CatResults.js';

class Cell extends Component {
  render() {
    return (
      <div className="Cell">
        <h1>Cell Phones</h1>
        <CatResults category={'cell'}
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

export default Cell;
