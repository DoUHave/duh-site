import React, { Component } from 'react';


class Root extends Component {
  render() {
    return (
      <div className="Root">
        {this.props.children}
      </div>
    );
  }
}

export default Root;
