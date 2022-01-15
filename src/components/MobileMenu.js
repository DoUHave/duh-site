import React, { Component } from 'react';
import NavBar from './NavBar.js';
import HamburgerImg from '../img/line-menu.svg';


class MobileMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }
    this.onHamburger = this.onHamburger.bind(this);
  }


  onHamburger = () => {
    const {showMenu} = this.state;
    if (!showMenu) {
      this.setState({
        showMenu: true
      })
    } else {
      this.setState({
        showMenu: false
      })
    }
  }



  render() {
    

    let navLinks = [
      { label: 'Home', link: '/' },
      { label: 'What People Need', link: '/WhatPeopleNeed' },
      { label: 'What You Need', link: '/WhatYouNeed' },
      { label: 'About Us', link: '/About' },
      { label: 'Contact', link: '/Contact'}
    ];

    return (
      <div className="MobileMenu">
        <div className="hamburger-menu" onClick={this.onHamburger}>
          <img src={HamburgerImg} />
        </div>
        {
          this.state.showMenu ? (
            <NavBar navLinks={navLinks} />
          ) : null
        }


      </div>
    );
  }
}

export default MobileMenu;
