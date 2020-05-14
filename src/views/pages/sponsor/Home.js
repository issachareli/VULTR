import React, { Component } from 'react';

import WPAPI from '../../../layouts/wpClient';
import FrontpageItem from '../../../layouts/FrontpageItem';

class Home extends Component {

  constructor () {
    super();
    this.state = {
      books: []
    }
 
  }

  componentDidMount (){

    const bookUrl = WPAPI.books;

    fetch(bookUrl)
    .then(response => response.json())
    .then(response => {
      this.setState({
        books: response
      })
    })
  }
 
  render() {

    
    return (

      <div className="container">
        
          <FrontpageItem posts={this.state.books} />
         
      </div>

    );
  }
}

export default Home;
