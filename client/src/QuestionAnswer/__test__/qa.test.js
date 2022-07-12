/** @jest-environment jsdom */
import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';

import renderer from 'react-test-renderer';
import {getQueriesForElement} from '@testing-library/dom';
import {render,fireEvent} from '@testing-library/react';

import QA from '../qa.jsx';


test('should render the question and answer title', () => {
  const root=document.createElement("div");
  ReactDOM.render(<QA/>,root );
  // expect(root.querySelector('h3').textContent).toBe('Question & Answers')
  var {getByText,getByLabelText}=getQueriesForElement(root);
  expect(getByText("Question & Answers")).not.toBeNull();
  getByText("Question & Answers");

  var {getByText,getByLabelText}=render(<QA/>);
  getByText("Question & Answers");
});

// it('should render the question list', () => {
//   const this.state = {
//     product_id: 66642,
//     related: [{
//       asker_name: "jackson",
//       question_body: "does it come in desert print?",
//       question_date: "2022-04-15T00:00:00.000Z",
//       question_helpfulness: 8,
//       question_id: 593269,
//       reported: false,
//       answers: {
//         5986089: {
//           answerer_name: "sharon",
//           body: "it is nice",
//           date: "2022-07-11T00:00:00.000Z",
//           helpfulness: 1,
//           id: 5986089,
//           photo:[]
//         },
//         5986090: {
//           answerer_name: "sharon",
//           body: "it is nice",
//           date: "2022-07-11T00:00:00.000Z",
//           helpfulness: 0,
//           id: 5986090,
//           photo:[]
//         }
//       }
//     }]
//   };
// render(<QuestionList key={`Product-${this.state.product_id}`} prod_id={this.state.product_id} allQ={this.state.related}
// relatedQ={this.state.related.slice(0,this.state.defQ)} addQ={this.handleAddQ}/>)

// })

// var mountNode = document.getElementById("app");
// const root=createRoot(mountNode);
// root.render(<App/>)


// test('adds 1 + 2 to equal 3', () => {
//   expect(1 + 2).toBe(3);
// });

{/* <QuestionList key={`Product-${this.state.product_id}`} prod_id={this.state.product_id} allQ={this.state.related}
        relatedQ={this.state.related.slice(0,this.state.defQ)} addQ={this.handleAddQ} /> */}