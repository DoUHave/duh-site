import React, { Component } from 'react';
import CatResults from './CatResults.js';


class Beauty extends Component {
  render() {
    return (
      <div className="Beauty">
        <h1>Beauty & Cosmetics</h1>
        <CatResults category={'beauty'}
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

export default Beauty;
