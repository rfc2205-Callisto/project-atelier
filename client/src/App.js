
import React from "react";
import axios from 'axios';
import QA from './QuestionAnswer/qa.jsx'
import AppProductDetail from "./productDetails/AppProductDetail.jsx"
import RR from './RR.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
=======
      name: 'Zach',
>>>>>>> ebae2980b953108834e02ac0d1b73a3096d0d633
      product_id: 66642
    }
  }
  componentDidMount() {
    console.log('App is Mounted :)')
  }

  newProductUp = (e) => {
    e.preventDefault();
    this.setState({
      product_id: this.state.product_id +1
    })
  }
  newProductDown = (e) => {
    e.preventDefault();
    this.setState({
      product_id: this.state.product_id -1
    })
  }

  render() {
    const name = this.state.name;
    return (
      <React.Fragment>
        <AppProductDetail/>
<<<<<<< HEAD
        <div>
=======
        <h1>
          Hello {name}, Ratings and Reviews go here v
        </h1>
        <span>
>>>>>>> ebae2980b953108834e02ac0d1b73a3096d0d633
          <button onClick={this.newProductDown}>-</button>
          <div>Product ID: {this.state.product_id} for Testing Purposes</div>
          <button onClick={this.newProductUp}>+</button>
        </div>
        <RR id={this.state.product_id}/>
        <QA id={this.state.product_id}/>
      </React.Fragment>
    );
  }
}


export default App;
