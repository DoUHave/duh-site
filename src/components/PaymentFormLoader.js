import React, { Component } from 'react';
import './PaymentFormLoader.css';
import PaymentForm from './PaymentForm.js';

class PaymentFormLoader extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
	  token: this.props.token
    }
  }

  componentWillMount(){
    const {that = this, token} = this.state;
    let sqPaymentScript = document.createElement('script');
    sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript"
    sqPaymentScript.async = false;
    sqPaymentScript.onload = ()=>{that.setState({
      loaded: true
    })};
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
	
  }

  render() {
	  return (
      this.state.loaded &&
	  	  <PaymentForm
          paymentForm={ window.SqPaymentForm }
        />
    );
  }
}

export default PaymentFormLoader;