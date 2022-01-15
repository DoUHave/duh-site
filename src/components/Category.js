import React, { Component } from 'react';


/**
 * Show a single category
 */
class Category extends Component {
  render() {
    let category = this.props.category;

    return (
      <div className="category">
        <a href={category.link}>
          <img src={category.bg} alt={category.label} />
          <div className="cat-title"><p>{category.label}</p></div>
        </a>
      </div>
    );
  }
}

export default Category;
