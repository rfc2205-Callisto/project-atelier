
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
<<<<<<< HEAD
      name:'zach',
      product_id: 66666
=======
      product_id: 66642
>>>>>>> 5e3107a968f526a715186d45084956bc0a234eaf
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
        <h1>
          Hello {name}, Ratings and Reviews go here v
        </h1>
=======
>>>>>>> 5e3107a968f526a715186d45084956bc0a234eaf
        <div>
          <button onClick={this.newProductDown}>-</button>
          <div>Product ID: {this.state.product_id} for Testing Purposes</div>
          <button onClick={this.newProductUp}>+</button>
        </div>
        <RR id={this.state.product_id}/>
        <Provider store={qastore}>
          <QA id={this.state.product_id}/>
        </Provider>
      </React.Fragment>
    );
  }
}


export default App;
