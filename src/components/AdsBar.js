import React, { Component } from "react";

class AdsBar extends Component {
  componentDidMount() {
    try {
      if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }

  render() {
    return (
      <>
      <div>
        <a href="https://www.duhflip.com/duh-collection" target="_blank">
          <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=392,h=368,fit=crop/AR0qZp23zGh7LqJD/2-Y4Lg80agjwh7z9De.png"/>
        </a>
      </div>
      <div className="AdsBar">

        {/* <div>
          <h2 style={{Color: '#fff'}}>AdsBar</h2>
        </div> */}
        <ins
          className="adsbygoogle douhave-google-ad"
          /*
            style={{ display: "block", marginTop: "20px", marginBottom: "20px" }}
          */
          data-ad-client="ca-pub-3613438433904573"
          data-ad-slot="5999152125"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        {/* <ins className="adsbygoogle douhave-google-add"
          style={{"display": "block", "marginTop": "80px", "marginBottom": "30px", border:"1px solid #1d1d1d"}}
          data-ad-client="ca-pub-3613438433904573"
          data-ad-slot="5999152125"
          data-ad-format="auto"></ins> */}

        {/* <ins className="adsbygoogle douhave-google-add"
          style={{"display": "block", "marginTop": "80px", "marginBottom": "30px", border:"1px solid #1d1d1d"}}
          data-ad-client="ca-pub-3613438433904573"
          data-ad-slot="5999152125"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins> */}
        {/* <ins className="adsbygoogle douhave-google-add"
          style={{"display": "block", "marginTop": "80px", "marginBottom": "30px", border:"1px solid #1d1d1d"}}
          data-ad-client="ca-pub-3613438433904573"
          data-ad-slot="5999152125"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins> */}
      </div>
      </>
    );
  }
}

export default AdsBar;
