import React, { Component } from "react";

class AdsBar extends Component {
  componentDidMount() {
    try {
      if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }

  render() {
    return (
      <div className="AdsBar">
      <ins
        className='adsbygoogle douhave-google-add'
        style={{
          display: 'block',
          marginTop: '250px',
          marginBottom: '20px',
        }}
        data-ad-client='ca-pub-3613438433904573'
        data-ad-slot='5999152125'
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
      </div>
    );
  }
}

export default AdsBar;
