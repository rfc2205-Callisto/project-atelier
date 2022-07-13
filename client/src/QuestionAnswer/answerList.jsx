import React, { useState } from "react";
import axios from 'axios';
const config = require('../../../config.js');

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';// English.
TimeAgo.addDefaultLocale(en);

import PhotoList from './photoList.jsx';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    this.props.addA()
  }

  render() {
    var LoadA;
    if(this.props.allA.length>this.props.relatedA.length){
      LoadA=<button onClick={this.handleClick}>Load More Answers</button>
    }else{
      LoadA=null;
    }
    return (
      <>
        {this.props.relatedA.map((ans) => {
          return (
            <>
              <div class="col-1 answers">A:</div>
              <div class="col-11">{ans.body}</div>
              <PhotoList class="container" key={`Photo-${ans.id}`} photos={ans.photos} />
              <div class="row">
                <div class="col-2">by {ans.answerer_name}</div>
                <div class="col-4">{ans.date}</div>
                <div class="col-4">Helpful? Yes({ans.helpfulness})</div>
              </div>
            </>
          )
        })}
        {LoadA}
      </>
    )

  }
}

export default AnswerList;




