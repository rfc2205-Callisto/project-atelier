import React, { useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import allActions from '../../Actions';
import axios from 'axios';
const config = require('../../../../config.js');
import PhotoList from './photoList.js';


var AnswerList = (props) => {

  var [defA, setDefA] = useState(2);
  var [helpful, setHelpful] = useState(false);
  var [report, setReport] = useState(false);

  var helpfulButton = (e) => {
    var id = e.target.parentElement.id || e.target.parentElement.parentElement.id;
    console.log(id)
    if (!helpful) {
      setHelpful(true);
      var apiReq = {
        method: 'put',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/answers/${id}/helpful`,
        headers: {
          'Authorization': `${config.TOKEN}`
        }
      }
      axios(apiReq).then(() => { console.log('answer helpfulness updated') }).catch((err) => { 'answer helpfulness not submitted' });
    }
  }

  var reportButton = (e) => {
    var id = e.target.parentElement.id || e.target.parentElement.parentElement.id;
    console.log(id)
    if (!report) {
      setReport(true);
      var apiReq = {
        method: 'put',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/answers/${id}/report`,
        headers: {
          'Authorization': `${config.TOKEN}`
        }
      }
      axios(apiReq).then(() => { console.log('answer is reported') }).catch((err) => { console.log('answer is not reported') })

      // axios.put(`qa/answers/${id}/report`).then(()=>{console.log('answer is reported')}).catch((err)=>{console.log('answer is not reported')});
    }
  }

  var LoadA;
  if (props.allA.length > defA) {
    LoadA = <button class="loadA" onClick={() => { setDefA(defA + 2) }}>Load More Answers</button>
  } else {
    LoadA = null;
  }

  return (
    <>
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
                <div className="helpfulness" onClick={helpfulButton}>Helpful? <u>Yes({ans.helpfulness})</u>   |   </div>
                <div className="helpfulness" onClick={reportButton}><u>Report</u></div>
              </div>
            </div>
          </div>
        )
      })}
      {LoadA}
    </>
  )


}

export default AnswerList;




