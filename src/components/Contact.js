import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <div className='Contact'>
        <h1>Contact</h1>
        <br />
        <h4>
          Email Questions, Comments, & Feedback to{' '}
          <a href='mailto:Team@douhave.co'>Team@DOUHAVE.CO</a>
        </h4>
        <div className='belowDesc'>
          <p>Have something to sell?</p>
          <p>Get a Cash Offer for Your Car/Item in 48 hours! No Obligation</p>
          <p>Free Pickup. A Quick and Easy Process!</p>
          <p>
            Not Local to Dallas Texas? DOUHAVE utilizes shipping partners for a
            no hassle transaction!
          </p>
        </div>
      </div>
    );
  }
}

export default Contact;
