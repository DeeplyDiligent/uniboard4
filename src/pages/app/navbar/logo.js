import React, { Component } from 'react';
class Logo extends Component {
    state = {  }
    render() { 
        return ( <img className="w-32 ml-4 mr-3" src={process.env.PUBLIC_URL + '/img/uniboard-2.svg'} /> );
    }
}
 
export default Logo;