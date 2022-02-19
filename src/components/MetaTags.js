import React from 'react';
import { Helmet } from 'react-helmet';

export default MetaTags = function(props) {
    let title = props.title || 'Do U Have';
    let description = props.description || 'Online platform to buy and sell locally where engagement is driven by needs.';
    let image = props.image || 'https://douhave-files.s3.us-east-2.amazonaws.com/Primary+Logo/Primary+Logo-+Off+Black.png';
    let url = props.url || 'https://www.douhave.co'; 

    return <Helmet>
        {/* Primary Meta Tags */}
        <title>{ title }</title>
        <meta name="title" content={ title }/>
        <meta name="description" content={ description }/>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={ url }/>
        <meta property="og:title" content={ title }/>
        <meta property="og:description" content={ description }/>
        <meta property="og:image" content={ image } />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={ url }/>
        <meta property="twitter:title" content={ title }/>
        <meta property="twitter:description" content={ description }/>
        <meta property="twitter:image" content={ image }/>
  </Helmet>;
  }