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
    var Answ;
    if (this.props.relatedA !== 0) {
      Answ = <div className="answers">A:</div>
    } else {
      Answ = null
    }
    var LoadA;
    if(this.props.allA.length>this.props.relatedA.length){
      LoadA=<button onClick={this.handleClick}>Load More Answers</button>
    }else{
      LoadA=null;
    }
    return (
      <>
        {Answ}
        {this.props.relatedA.map((ans) => {
          return (
            <>
              <div >{ans.body}</div>
              <PhotoList key={`Photo-${ans.id}`} photos={ans.photos} />
              <div >by {ans.answerer_name}</div>
              <div >{ans.date}</div>
              <div >Helpful? Yes({ans.helpfulness})</div>
            </>
          )
        })}
        {LoadA}
      </>
    )

  }
}

export default AnswerList;




