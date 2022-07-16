import React, { useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import allActions from '../../Actions';
import axios from 'axios';
const config = require('../../../../config.js');
import AddQuestion from './addQuestion.js'
import AddAnswer from './addAnswer.js';
import AnswerList from './answerList.js';

var QuestionList = () => {
  var allQ = useSelector(state => state.allQ);
  var relatedQ = useSelector(state => state.relatedQ);

  var [defQ, setDefQ] = useState(2);
  var [showDiagQ, setShowDiagQ] = useState(false);
  var [selectIdQ, setSelectIdQ] = useState();
  var [showDiagA, setShowDiagA] = useState(false);


  var helpfulButton = (e) => {
    var question_id = e.target.parentElement.id;
    // axios.put(`qa/questions/${id}/helpful`).then(() => { console.log('question helpfulness updated') }).catch((err) => { console.log('question helpfulness not submitted') });
    var apiReq = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions/${question_id}/helpful`,
      headers: {
        'Authorization': `${config.TOKEN}`
      }
    }
    console.log(apiReq)
    axios(apiReq).then(() => { console.log('helpful button clicked') }).catch((err) => { throw err })
  }


  var LoadQ;
  if (allQ.length > relatedQ.length) {
    LoadQ = < button class="loadQ" onClick={() => { setDefQ(defQ + 2) }} >Load more questions</button >
  } else {
    LoadQ = null
  };

  var handleAddQ = () => {
    setShowDiagQ(!showDiagQ);
  }
  var handleAddA = (e) => {
    setSelectIdQ(e.target.id||'');
    setShowDiagA(!showDiagA);
  }
  return (
    <>
      {showDiagQ && <AddQuestion closeModal={setShowDiagQ} />}
      {showDiagA && <AddAnswer quest_id={selectIdQ} closeModal={handleAddA}/>}
      <div class="container">
        {relatedQ.map((Quest) => {
          return (
            <div class="oneQ">
              <div class="partQ" id={Quest.question_id}>
                <div class="symbol">Q:</div>
                <div class="questBody" > {Quest.question_body}</div>
                <div class="helpfulness" id={Quest.question_id} onClick={helpfulButton}>Helpful? <u>Yes({Quest.question_helpfulness})</u></div>
                <div class="addAns" >
                  <button id={Quest.question_id} class="addA" onClick={handleAddA}>Add Answer</button>
                </div>
              </div>
              <AnswerList allA={Object.values(Quest.answers)}/>
            </div>
          )
        })
        }
      </div>
      <div class="container">
        < div class="otherOptions" >
          {LoadQ}
          <button class="addQ" onClick={handleAddQ}>Add Question</button>
        </div >
      </div>

    </>
  )

}


export default QuestionList;