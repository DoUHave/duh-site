import React, { Component } from 'react';
import logo from '../img/Primary Logo- Pure Black.png';


class About extends Component {
  render() {
    return (
      <div className="About">
        <h1>About</h1>
        
		<iframe width="560" height="315" src="https://www.youtube.com/embed/fLMPsJPK2-A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

		{/* <img className="logowbg" src={logo} alt="DoUHaveLogo" /> */}

		<br/> <br/>

        <label style={{fontWeight: 'bolder'}}>MICRO</label><p className="aboutText">To define the visual story of DoUHave. DoUHave
			is an online platform to buy and sell locally where
			engagement is driven by needs. DoUHave provides a
			unique platform for its unique target market and is
			the first of its kind dedicated to “ISO” buyers. The
			aesthetic and visual language of the brand need to
			be as equally unique from the other secondhand
			market platforms. The look should reflect DoUHave’s
			mission to connect specialty buyers with what they
			are looking for in a more efficient and satisfying way.</p>
			
        <label style={{fontWeight: 'bolder'}}>MACRO</label><p className="aboutText">DoUHave seeks to fill in the gap in the secondhand
			market, “ISO” and “WTB” groups need a platform to
			connect and engage with sellers. It is not just another
			secondhand market platform, it is a collector’s, a
			specialty buyers, a thrifter’s go to spot to find what
			they are looking for. DoUHave will reframe how
			buyers and sellers view the second hand market and
			engage with one another in a fresh and efficient way.</p>
        
		<label style={{fontWeight: 'bolder'}}>TRAITS</label><br/ >
		<label style={{fontWeight: 'bolder'}}>CONNECTING COMMUNITIES</label>
		<p className="aboutText">DoUHave is about bringing together buyers looking
			for something they need with the sellers- the people
			who have what they are looking for. It’s about creating
			engagement between these two communities driven by
			demand and connecting them in an easier way.</p>
        <label style={{fontWeight: 'bolder'}}>UNIQUE</label><p className="aboutText">This brand is unique from it’s origin story as it is
			the first platform dedicated to “ISO” (In Search of)
			buyers. The platform itself brings together a variety
			of people who love their specific niche and connect
			them to people who have rare and unique items.</p>
			
		<label style={{fontWeight: 'bolder'}}>PROUD</label><p className="aboutText">DoUHave is proud to be the first of its kind in the
			secondhand good industry just as people in this
			category have become more proud to find unique,
			on-budget items. DoUHave embraces this.</p>

      </div>
    );
  }
}

export default About;
