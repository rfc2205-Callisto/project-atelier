import React, { useState } from "react";
import axios from 'axios';

import PhotoList from './photoList.jsx';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      helpA:false,
      reportA:false
    }
  }

  handleClick = (e) => {
    this.props.addA()
  }
  helpfulButton=(e)=>{
    var id=e.target.parentElement.id;
    var helpful=(this.state.helpA)?false:true;
    this.setState({
      helpA:helpful
    })
    if(helpful){
      axios.put(`qa/answers/${id}/helpful`).then(()=>{console.log('answer helpfulness updated')}).catch((err)=>{console.log('answer helpfulness not submitted')});
    }
  }
  reportButton=(e)=>{
    var id=e.target.parentElement.id;
    var report=(this.state.reportA)?false:true;
    this.setState({
      reportA:report
    })
    if(report){
      axios.put(`qa/answers/${id}/report`).then(()=>{console.log('answer is reported')}).catch((err)=>{console.log('answer is not reported')});
    }
  }
  render() {
    var LoadA;
    if(this.props.allA.length>this.props.relatedA.length){
      LoadA=<button class="loadA" onClick={this.handleClick}>Load More Answers</button>
    }else{
      LoadA=null;
    }
    return (
      <>
        {this.props.relatedA.map((ans) => {
          return (
            <div class="partA">
              <div class="symbol">A:</div>
              <div class="answer">
                <div class="ansBody">{ans.body}</div>
                <PhotoList class="container" key={`Photo-${ans.id}`} photos={ans.photos} />
                <div class="answerer" id={ans.id}>
                  <div>by {ans.answerer_name}   |</div>
                  <div>{ans.date.slice(0,10)}   |</div>
                  <div onClick={this.helpfulButton}>Helpful? <u>Yes({ans.helpfulness})</u>   |</div>
                  <div onClick={this.reportButton}><u>Report</u></div>
                </div>
              </div>
            </div>
          )
        })}
        {LoadA}
      </>
    )

  }
}

export default AnswerList;




