
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
    // window.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   let allClicks = this.state.clicked;
    //   if (this.state.clicked[`Tag: ${event.target.tagName} InnerHtml: ${event.target.innerHTML}`] === undefined) {
    //     allClicks[`Tag: ${event.target.tagName} InnerHtml: ${event.target.innerHTML}`] = {clicks: 1, time: [new Date()]};
    //   }
    //   if (typeof this.state.clicked[`Tag: ${event.target.tagName} InnerHtml: ${event.target.innerHTML}`].clicks === 'number') {
    //     let clicks = allClicks[`Tag: ${event.target.tagName} InnerHtml: ${event.target.innerHTML}`].clicks + 1
    //     allClicks[`Tag: ${event.target.tagName} InnerHtml: ${event.target.innerHTML}`].clicks = clicks;
    //     let array = allClicks[`Tag: ${event.target.tagName} InnerHtml: ${event.target.innerHTML}`].time;
    //     array.push(new Date());
    //     allClicks[`Tag: ${event.target.tagName} InnerHtml: ${event.target.innerHTML}`].time = array;
    //   }
    //   this.setState({
    //     clicked: allClicks
    //   })
    // })

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

  toggle = (e) => {
    e.preventDefault();

    document.body.classList.toggle("dark");
  }

  render() {
    return (
      <React.Fragment>
        <AppProductDetail/>
        <div>
          <button onClick={this.newProductDown}>-</button>
          <div>Product ID: {this.state.product_id} for Testing Purposes</div>
          <button onClick={this.newProductUp}>+</button>
          <button onClick={() => {console.log(this.state.clicked); alert('See Dev Tools for Click Tracker Info')}}>Click Counter</button>
          <button onClick={this.toggle}>Toggle Dark Mode</button>
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
