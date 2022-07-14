import React, { useState } from "react";
import axios from 'axios';


import AnswerList from './answerList.jsx';
import AddAnswer from './addAnswerNew.jsx';
import AddQuestionNew from './addQuestionNew.jsx';



class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialogQ: false,
      showDialogA: false,
      defA: 2,
      helpQ: false
    }
  }
  handleClick = (e) => {
    this.props.addQ();
  }

  handleAddA = () => {
    var addCount = this.state.defA + 2;
    this.setState({
      defA: addCount
    })
  }
  helpfulButton = (e) => {
    var id = e.target.parentElement.id;
    var helpful = (this.state.helpQ) ? false : true;
    this.setState({
      helpQ: helpful
    })
    if (helpful) {
      axios.put(`qa/questions/${id}/helpful`).then(() => { console.log('question helpfulness updated') }).catch((err) => { console.log('question helpfulness not submitted') });
    }
  }
  handleDialogQ = (e) => {
    var newState = !this.state.showDialogQ;
    this.setState({showDialogQ: newState})
  }
  handleDialogA = (e) => {
    var newState = !this.state.showDialogA;
    this.setState({
      showDialogA: newState,
    quest_id:e.target.quest_id||''
  })
  }
  render() {
    var LoadQ;
    if (this.props.allQ.length > this.props.relatedQ.length) {
      LoadQ = < button class="loadQ" onClick={this.handleClick} >Load more questions</button >
    } else {
      LoadQ = null
    }
    return (
      <>
        {this.state.showDialogQ && < AddQuestionNew prod_id={this.props.prod_id} closeModal={this.handleDialogQ}/>}
        {this.state.showDialogA && <AddAnswer prod_id={this.props.prod_id} quest_id={this.state.quest_id} closeModal={this.handleDialogA}/>}
        <div class="container">
          {
            this.props.relatedQ.map((Quest) => {
              return (
                <div class="oneQ">
                  <div class="partQ" id={Quest.question_id}>
                    <div class="symbol">Q:</div>
                    <div class="questBody" > {Quest.question_body}</div>
                    <div class="helpfulness" onClick={this.helpfulButton}>Helpful? <u>Yes({Quest.question_helpfulness})</u></div>
                    <div class="addAns" >
                      <button quest_id={Quest.question_id} class="addA" onClick={this.handleDialogA}>Add Answer</button>
                    </div>
                  </div>
                  <AnswerList key={`Answer-${Quest.question_id}`} allA={Object.values(Quest.answers)} relatedA={Object.values(Quest.answers).slice(0, this.state.defA)} addA={this.handleAddA} fetchData={this.props.fetchData} />
                </div>
                // </div>
              )
            })
          }
        </div>
        <div class="container">
          < div class="otherOptions" >
            {LoadQ}
            <button class="addQ" onClick={this.handleDialogQ}>Add Question</button>
          </div >
        </div>

      </>
    )

  }
}

export default QuestionList;


// return (
//   <>
//     <div class="container">
//       {
//         this.props.relatedQ.map((Quest) => {
//           return (
//             <div class="oneQ">
//               <div class="row">
//                 <div class="col-auto ">Q:</div>
//                 <div class="col-7 questBody" > {Quest.question_body}</div>
//                 <div class="col-2 helpfulness">Helpful? Yes({Quest.question_helpfulness})</div>
//                 <div class="col-2 addAns" >
//                   <AddAnswer prod_id={this.props.prod_id} quest_id={Quest.question_id} />
//                 </div>
//               </div>
//               <div class="row ">
//                 {/* <div class="date">{Quest.question_date}</div> */}
//                 <AnswerList key={`Answer-${Quest.question_id}`} allA={Object.values(Quest.answers)} relatedA={Object.values(Quest.answers).slice(0, this.state.defA)} addA={this.handleAddA} />
//               </div>
//             </div>
//           )
//         })
//       }
//     </div>
//     <div class="container">
//       < div class="row" >
//         {LoadQ}
//         < AddQuestion prod_id={this.props.prod_id} />
//       </div >
//     </div>
//   </>
// )

// }
// }

// export default QuestionList;
