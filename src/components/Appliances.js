import React, { Component } from 'react';
import CatResults from './CatResults';


class Appliances extends Component {
  render() {
    return (
      <div className="Appliances">
        <h1>Appliances</h1>
        <CatResults category={'appliance'}
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

export default Appliances;
