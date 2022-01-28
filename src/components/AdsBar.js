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
      </div>
      </>
    );
  }
}

export default AdsBar;
