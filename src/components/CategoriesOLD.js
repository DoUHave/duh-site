import React, { Component } from 'react';
import Category from './Category';

import autobg from '../img/autobg.jpg';
import appliancebg from '../img/appliancebg.jpg';
import cellbg from '../img/cellbg.jpg';
import furniturebg from '../img/furniturebg.jpg';
import instrumentbg from '../img/instrumentbg.jpg';
import motobg from '../img/motobg.jpg';
import vidgamebg from '../img/vidgamebg.jpg';
import beautybg from '../img/beautybg.jpg';
import packagebg from '../img/packagebg.jpg';
import homeservicebg from '../img/homeservicebg.jpeg';
import clothingbg from '../img/clothingbg.jpg';
import miscbg from '../img/miscbg.jpg';
import autoservicebg from '../img/autoservicebg.png';
import collectiblesbg from '../img/collectiblesbg.jpg';
import comequipbg from '../img/comequipbg.jpg';
import housingbg from '../img/housingbg.jpg';



class Categories extends Component {
  render() {

    let catLinks = [
      { label: 'Cars & Trucks', link: '/auto', bg: autobg },
      { label: 'Appliances', link: '/appliances', bg: appliancebg },
      { label: 'Moto/ATV/UTV', link: '/moto', bg: motobg },
      { label: 'Cell Phones', link: '/cell', bg: cellbg },
      { label: 'Furniture', link: '/furniture', bg: furniturebg },
      { label: 'Musical Instruments', link: '/instruments', bg: instrumentbg },
      { label: 'Video Games', link: '/games', bg: vidgamebg },
      { label: 'Clothing, Apparel, & Accessories', link: '/clothing', bg: clothingbg },
      { label: 'Antiques & Collectibles', link: '/collectibles', bg: collectiblesbg },
      { label: 'Beauty', link: '/beauty', bg: beautybg },
      { label: 'Commercial & Restaurant Equipment', link: '/comequip', bg: comequipbg },
      { label: 'Everything Else', link: '/misc', bg: miscbg },
      { label: 'Housing & Places to Live', link: '/housing', bg: housingbg },
      { label: 'Auto Service', link: '/autoservice', bg: autoservicebg },
      { label: 'Home Service', link: '/homeservice', bg: homeservicebg },
      { label: 'Package Deals', link: '/packagedeals', bg: packagebg}


    ];

    return (
      <div className="Categories">

        <Category catLinks={catLinks[0]} />
        <Category catLinks={catLinks[1]} />
        <Category catLinks={catLinks[2]} />
        <Category catLinks={catLinks[3]} />
        <Category catLinks={catLinks[4]} />
        <Category catLinks={catLinks[5]} />
        <Category catLinks={catLinks[6]} />
        <Category catLinks={catLinks[7]} />
        <Category catLinks={catLinks[8]} />
        <Category catLinks={catLinks[9]} />
        <Category catLinks={catLinks[10]} />
        <Category catLinks={catLinks[11]} />
        <Category catLinks={catLinks[12]} />
        <Category catLinks={catLinks[13]} />
        <Category catLinks={catLinks[14]} />



      </div>
    );
  }
}

export default Categories;
