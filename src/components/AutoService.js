import React, { Component } from 'react';
import CatResults from './CatResults.js';


class AutoService extends Component {
  render() {
    return (
      <div className="AutoService">
        <h1>Auto Services</h1>
        <CatResults category={'autoservice'}
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

export default AutoService;
