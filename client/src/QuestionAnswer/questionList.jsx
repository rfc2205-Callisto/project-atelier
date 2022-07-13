import React, { useState } from "react";
import axios from 'axios';
const config = require('../../../config.js');

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';// English.
TimeAgo.addDefaultLocale(en);

import AnswerList from './answerList.jsx';
import AddAnswer from './addAnswer.jsx';
import AddQuestion from './addQuestion.jsx';


class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      defA:2
    }
  }
  handleClick = (e) => {
    this.props.addQ();
  }

  handleAddA=()=>{
    var addCount=this.state.defA+2;
    this.setState({
      defA:addCount
    })
  }
  render() {
    var LoadQ;
    if(this.props.allQ.length>this.props.relatedQ.length){
      LoadQ=< button onClick={this.handleClick} >Load more questions</button >
    }else{
      LoadQ=null;
    }

    return (
      <div class="container">
        {
          this.props.relatedQ.map((Quest) => {
            return (
              <div class="border">
                <div class="row ">
                  <div class="col-1">Q:</div>
                  <div class="col-7 questBody" > {Quest.question_body}</div>
                  <div class="col-2">Helpful? Yes({Quest.question_helpfulness})</div>
                  <div class="col-2 addAns" >
                    <AddAnswer prod_id={this.props.prod_id} quest_id={Quest.question_id} />
                  </div>
                </div>
                <div class="row ">
                  {/* <div class="date">{Quest.question_date}</div> */}
                  <AnswerList key={`Answer-${Quest.question_id}`} allA={Object.values(Quest.answers)} relatedA={Object.values(Quest.answers).slice(0,this.state.defA)} addA={this.handleAddA}/>
                </div>
              </div>
            )
          })
        }
        {LoadQ}
        <AddQuestion prod_id={this.props.prod_id} />
      </div>
    )

  }
}

export default QuestionList;

