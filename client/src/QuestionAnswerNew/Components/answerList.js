import React, { useState } from 'react';
import axios from 'axios';

import PhotoList from './photoList.js';


var AnswerList = (props) => {

  var [defA, setDefA] = useState(2);
  var [helpful, setHelpful] = useState(false);
  var [report, setReport] = useState('');

  var helpfulButton = (e) => {
    var id = e.target.parentElement.id || e.target.parentElement.parentElement.id;
    console.log(id)
    if (!helpful) {
      setHelpful(true);
      axios.put(`qa/answers/${id}/helpful`)
        .then(() => { console.log('answer helpfulness updated') })
        .catch((err) => { console.log('answer helpfulness not submitted') });
    }
  }

  var reportButton = (e) => {
    var id = e.target.parentElement.id || e.target.parentElement.parentElement.id;
    if (!report) {
      setReport(true)
      axios.put(`qa/answers/${id}/report`)
        .then(() => { console.log('answer is reported') })
        .catch((err) => { console.log('answer is not reported') });
    }
  }

  var LoadA;
  if (props.allA.length > defA) {
    LoadA = <button class="loadA" onClick={() => { setDefA(defA + 2) }}>Load More Answers</button>
  } else {
    LoadA = null;
  }


  return (
    <div className="oneA scrollerA">
      {props.allA.slice(0, defA).map((ans) => {
        return (
          <div class="partA">
            <div class="symbol">A:</div>
            <div class="answer">
              <div class="ansBody">{ans.body}</div>
              <PhotoList class="container" photos={ans.photos} />
              <div class="answerer" id={ans.id}>
                <div>by {ans.answerer_name}   |   </div>
                <div>{ans.date.slice(0, 10)}   |   </div>
                <div className="helpfulness" onClick={helpfulButton}>Helpful? <u>Yes({ans.helpfulness})</u>   |</div>
                <div className="helpfulness" value={ans.id} onClick={reportButton}><u>{ans.repoted?"Reported":"Report"}</u></div>
              </div>
            </div>
          </div>
        )
      })}
      {LoadA}
    </div >
  )


}

export default AnswerList;




