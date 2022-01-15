import React, { Component } from 'react';
import Category from './Category';
import Antiques from '../img/Antiques.png';
import Vintage from '../img/Vintage clothes and accessories.png';
import Collectibles from '../img/Collectibles.png';
import Vehicles from '../img/Rare & Custom Vehicles.png';
import VintageHome from '../img/Vintage Home.png';
import Other from '../img/Other.png';
import { Row, Col } from "reactstrap";

/**
 * Categories panel
 * Displaying all the categories supported by the system
 */
class Categories extends Component {
  render() {
    let categories = [
      { label: 'Antiques', link: '/antiques', bg: Antiques },
      { label: 'Vintage', link: '/vintage', bg: Vintage },
      { label: 'Collectibles', link: '/collectibles', bg: Collectibles },
      { label: 'Rare & Custom Vehicles', link: '/rarevehicles', bg: Vehicles },
      { label: 'Vintage Home', link: '/vintageHome', bg: VintageHome },
      { label: 'Other', link: '/other', bg: Other }
	  ];

    return (
      <Row className="Categories">
        {
          categories.map((category) => (
            <Col key={category.label}>
              <Category category={category} />
            </Col>
          ))
        }
      </Row>
    );
  }
}

export default Categories;
