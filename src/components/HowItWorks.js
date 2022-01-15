import React, { Component } from 'react';
import logo from '../img/LogoWbg.png';


class HowItWorks extends Component {
  render() {
    return (
      <div className="HowItWorks">
        <h1>How It Works</h1>
        <img className="logowbg" src={logo} alt="DoUHaveLogo" />
        <h2>Save Money (Find It)</h2>
        <p style={{paddingLeft:'200px'}}>Need something? Sign up to create an account where you can post what you need and the budget you're happy with. They come to you!</p>
        <h2>Make Money (Sell It)</h2>
        <p style={{paddingLeft:'200px'}}>People want to make money. People have things laying around that they don’t know it’s worth something. Want to make money? Go to the website and look at what people need and start letting them know you have what they want. Search “What people need” Tab and contact them if you have what they are looking for near their location. We discourage cash and prefer users to use the quality one way apps. for transitions.</p>
        <hr />
        <iframe width="450" height="315" src="https://www.youtube.com/embed/u5gRs9d70z8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
        <iframe width="450" height="315" src="https://www.youtube.com/embed/94HZAkkfbPo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <hr />
        <p style={{paddingLeft:'200px'}}>Please have patience as this is our Beta site and is still in development. A new site that will take time to build up multiple classified ad posts where it is beneficial. Please help us post items that you want.</p>
      </div>
    );
  }
}

export default HowItWorks;
