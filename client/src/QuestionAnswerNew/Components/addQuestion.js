import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AddQuestion(props) {

  var prod_id = useSelector(state => state.product_id);

  var [name, setName] = React.useState()
  var [question, setQuestion] = React.useState()
  var [email, setEmail] = React.useState()


  var handleSubmit = (e) => {
    e.preventDefault();
    props.closeModal();
    var data = {
      "product_id": Number(prod_id),
      "body": question,
      "name": name,
      "email": email
    };

    axios.post('/qa/questions', data)
      .then((res) => { console.log('yay Question is added supposely') })
      .catch((err) => { console.log('there is error in adding question') });
  }

  return (
    <div class="container">
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => { props.closeModal(false) }}>x</button>
          </div>
          <div className="title">Add a Question</div>
          <div className="body">
            <label>Name:<input value={name} placeholder="Example: jackson11!" onChange={(e) => { setName(e.target.value) }} required></input></label>
            <label>Question:<input value={question} placeholder="add a quesiton ..." onChange={(e) => { setQuestion(e.target.value) }} required></input></label>
            <label>Email:<input type="email" value={email} placeholder="email ..." onChange={(e) => { setEmail(e.target.value) }} required></input></label>
            {/* <label>Photos:<button>upload photots</button></label> */}
          </div>
          <div className="footer">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default AddQuestion
