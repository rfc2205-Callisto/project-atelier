import React from "react";
import axios from 'axios';


function AddQuestion(props){


  var [name,setName]=React.useState()
  var [question,setQuestion]=React.useState()
  var [email,setEmail]=React.useState()

  var handleSubmit = (e) => {
    e.preventDefault();
    props.closeModal();
    var data = {
      "product_id": Number(props.prod_id),
      "body": question,
      "name": name,
      "email": email
    };

    axios.post('/qa/questions', data).then((res) => {
      console.log('yay Question is added supposely')
      console.log(res.data)
    }).catch((err) => { console.log('there is error in adding question') })
  }


  return (
    <div class="container">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={()=>{props.closeModal()}}>x</button>
        </div>
        <div className="title">Add a Question</div>
        <div className="body">
          <label>Name:<input value={name} placeholder="username ..." onChange={(e)=>{setName(e.target.value)}}></input></label>
          <label>Question:<input value={question} placeholder="add a quesiton ..." onChange={(e)=>{setQuestion(e.target.value)}}></input></label>
          <label>Email:<input  value={email} placeholder="email ..." onChange={(e)=>{setEmail(e.target.value)}}></input></label>
          {/* <label>Photos:<button>upload photots</button></label> */}
        </div>
        <div className="footer">
          <button onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
  )

}

export default AddQuestion
