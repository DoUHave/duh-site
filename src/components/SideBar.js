import React, { Component } from 'react';
import { FaFacebookF, FaInstagram, FaMusic, FaYoutube } from 'react-icons/fa';
import SidebarBlackImg from '../img/Sidebar- Black.png';
import NavBar from './NavBar.js';

class SideBar extends Component {
  componentDidMount() {
    try {
      if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }

  render() {
    let navLinks = [
      { label: 'Home', link: '/' },
      { label: 'What People Need', link: '/WhatPeopleNeed' },
      { label: 'What You Need', link: '/WhatYouNeed' },
      { label: 'About Us', link: 'http://www.duhflip.com' },
      { label: 'Contact', link: '/Contact' },
      {
        label: 'Our Collection',
        link: 'https://duhflip.com/duh-collection',
      },
    ];

    return (
      <div
        className='SideBar'
        style={{
          background: `url('${SidebarBlackImg}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#232323',
        }}>
        <NavBar navLinks={navLinks} />
        <div className='footer-social'>
          <a href='https://www.facebook.com/DoUhave.co' target='_blank'>
            {' '}
            <FaFacebookF className='footer-icon' />{' '}
          </a>{' '}
          <a href='https://www.instagram.com/douhave.co/' target='_blank'>
            {' '}
            <FaInstagram className='footer-icon' />
          </a>{' '}
          <a
            href='https://www.youtube.com/channel/UCjwi66Egr3vAgOvz33mpJwg'
            target='_blank'>
            <FaYoutube className='footer-icon' />
          </a>{' '}
          <a
            href='https://www.tiktok.com/@team.douhave?lang=en'
            target='_blank'>
            <FaMusic className='footer-icon' />
          </a>
          <p>© 2021 | Douhave.co | All Rights Reserved</p>
        </div>
      </div>
    );
  }
}

export default SideBar;
