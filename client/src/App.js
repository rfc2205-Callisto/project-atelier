
import React from "react";
import axios from 'axios';
import QA from './QuestionAnswer/qa.jsx'
import AppProductDetail from "./productDetails/AppProductDetail.jsx"
import RR from './RR.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <span>
          <button onClick={this.newProductDown}>-</button>
          <button onClick={this.newProductUp}>+</button>
        </span>
        <RR id={this.state.product_id}/>
        <QA id={this.state.product_id}/>
      </React.Fragment>
    );
  }
}


export default App;
