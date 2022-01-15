import React, { Component } from 'react';
import MenuLine from '../img/thin-white-line-png-6.png';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let navLinks = this.props.navLinks;

    return (
      <div className='NavBar'>
        {/* <hr
        style={{
            backgroundColor: '#F9F3EF',
			width: '40%',
			marginTop: '30px',
            height: 1
        }} /> */}
        {/* <hr
        style={{
            backgroundColor: '#F9F3EF',
			width: '60%',
			marginTop: '10px',
            height: 1
        }} /> */}
        <div className='NavBarItems'>
          {navLinks.map((navLinks, index) =>
            navLinks.label == 'About Us' ||
            navLinks.label == 'Our Collection' ? (
              <a key={index} href={navLinks.link} target='_blank'>
                {navLinks.label}
              </a>
            ) : (
              <a key={index} href={navLinks.link}>
                {navLinks.label}
              </a>
            )
          )}
        </div>
        <hr style={{ backgroundColor: '#F9F3EF', width: '70%' }} />
        <hr
          style={{ backgroundColor: '#F9F3EF', width: '50%', marginTop: '5px' }}
        />
        {/* <div className="NavBar">
          <div className="NavBarItems">

            <h2>CONTACT US</h2>
            <p>LAWRENCE MORENO,<br></br>935-9940 tortor, street santa rosa mn 98804 <br></br>
              (684)579-1879 </p>
          </div>
        </div> */}
      </div>
    );
  }
}

export default NavBar;
