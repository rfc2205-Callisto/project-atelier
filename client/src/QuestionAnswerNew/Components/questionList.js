import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
    var id = e.target.parentElement.id || e.target.parentElement.parentElement.id;
    var helpful = document.getElementsByClassName(`helpfulness`)[0];
    if (helpful.innerHTML.includes('?')) {
      helpful.innerHTML = 'Helpful ✓   ';
      axios.put(`qa/questions/${id}/helpful`)
        .then(() => { console.log('question helpfulness updated') })
        .catch((err) => { console.log('question helpfulness not submitted') });
    }
  }


  var LoadQ;
  if (allQ.length<=2){
    LoadQ=null;
  }else if(allQ.length > defQ) {
    LoadQ = <button class="loadQ" onClick={() => { setDefQ(defQ + 2) }} >Load More Questions</button >
  } else {
    LoadQ = <button class="loadQ" onClick={() => { setDefQ(2) }} >Collapse Questions</button >
  };

  var handleAddQ = () => {
    setShowDiagQ(!showDiagQ);
  }
  var handleAddA = (e) => {
    setSelectIdQ(e.target.id || '');
    setShowDiagA(!showDiagA);
  }
  return (
    <>
      {showDiagQ && <AddQuestion closeModal={setShowDiagQ} />}
      {showDiagA && <AddAnswer quest_id={selectIdQ} closeModal={handleAddA} />}
      <div class="container qlist scroller">
        {relatedQ.slice(0, defQ).map((Quest) => {
          return (
            <div class="oneQ ">
              <div class="partQ" id={Quest.question_id}>
                <div class="symbol fs-5">Q:</div>
                <div class="questBody fs-5" > {Quest.question_body}</div>
                <div class="helpfulness" id={Quest.question_id} onClick={helpfulButton}>Helpful? <u>Yes({Quest.question_helpfulness})</u></div>
                <div class="addAns" >
                  <button id={Quest.question_id} class="addA" onClick={handleAddA}>Add Answer</button>
                </div>
              </div>
              <AnswerList allA={Object.values(Quest.answers)} />
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