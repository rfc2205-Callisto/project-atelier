import React from "react";
import axios from 'axios';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import AppProductDetail from "./productDetails/AppProductDetail.jsx"
import RR from './RR.js'
import QA from './QuestionAnswerNew/Components/qa.js';

import qaReducer from './QuestionAnswerNew/Reducers/qaReducer';
var qastore=createStore(qaReducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 66666,
      clicked: {}
    }
    window.addEventListener('click', (event) => {
      event.preventDefault();
      let allClicks = this.state.clicked;
      if (this.state.clicked[event.target.tagName] === undefined) {
        allClicks[event.target.tagName] = 1;
      }
      if (typeof this.state.clicked[event.target.tagName] === 'number') {
        allClicks[event.target.tagName] += 1;
      }
      this.setState({
        clicked: allClicks
      })
    })

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
        <div>
          <button onClick={this.newProductDown}>-</button>
          <div>Product ID: {this.state.product_id} for Testing Purposes</div>
          <button onClick={this.newProductUp}>+</button>
          <button onClick={() => {console.log(this.state.clicked)}}>Click Counter</button>
        </div>
        <RR class='RRParent' id={this.state.product_id}/>
        <Provider store={qastore}>
          <QA id={this.state.product_id}/>
        </Provider>
      </React.Fragment>
    );
  }
}


export default App;
