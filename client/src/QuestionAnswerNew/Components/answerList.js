import React, { useState } from 'react';
import axios from 'axios';

import PhotoList from './photoList.js';


var AnswerList = (props) => {

  var [defA, setDefA] = useState(2);

  var helpfulButton = (e) => {
    var id = e.target.parentElement.id || e.target.parentElement.parentElement.id;
    var helpful = document.getElementsByClassName(`help${id}`)[0];
    if (helpful.innerHTML.includes('?')) {
      helpful.innerHTML=`Helpful ✓   |`;
      axios.put(`qa/answers/${id}/helpful`)
        .then(() => { console.log('answer helpfulness updated') })
        .catch((err) => { console.log('answer helpfulness not submitted') });
    }
  }

  var reportButton = (e) => {
    var id = e.target.parentElement.id || e.target.parentElement.parentElement.id;
    var report = document.getElementsByClassName(`report${id}`)[0];
    if (report.innerHTML === 'Report') {
      report.parentElement.innerHTML = 'Reported';
      axios.put(`qa/answers/${id}/report`)
        .then(() => { console.log('answer is reported') })
        .catch((err) => { console.log('answer is not reported') });

    }
  }

  var LoadA;
  if (props.allA.length<=2){
    LoadA=null;
  }else if(props.allA.length > defA) {
    LoadA = <button class="loadA" onClick={() => { setDefA(defA + 2) }}>Load More Answers</button>
  } else{
    LoadA = <button class="loadA" onClick={() => { setDefA(2) }}>Collapse Answers</button>
  }


  return (
    <div className="oneA scrollerA">
      {props.allA.slice(0, defA).map((ans) => {
        return (
          <div class="partA">
            <div class="symbol fs-5 fw-light">A:</div>
            <div class="answer">
              <div class="ansBody fs-5 fw-light">{ans.body}</div>
              <PhotoList class="container" photos={ans.photos} />
              <div class="answerer" id={ans.id}>
                <div>by {ans.answerer_name}   |   </div>
                <div>{ans.date.slice(0, 10)}   |   </div>
                <div className="helpfulness" className={`help${ans.id}`} id={ans.helpfulness} onClick={helpfulButton}>Helpful? <u>Yes({ans.helpfulness})</u>   |</div>
                <div className="helpfulness" onClick={reportButton}><u className={`report${ans.id}`}>Report</u></div>
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




