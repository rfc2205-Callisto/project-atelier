import React from "react";
import axios from 'axios';


var AddAnswer = (props) => {


  var [name, setName] = React.useState()
  var [answer, setAnswer] = React.useState()
  var [email, setEmail] = React.useState()


  var handleSubmit = (e) => {
    e.preventDefault();
    this.close();
    var data = {
      "body": answer,
      "name": name,
      "email": email,
      "photo": []
    };

    axios.post(`/qa/questions/${Number(props.quest_id)}/answers`, data).then((result) => {
      conosle.log('yay Answer is added supposely')
      console.log(result.data)
    }).catch((err) => { console.log('there is error in adding answer') })
  }


  return (


    <div class="container">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={(e) => { props.closeModal(e) }}>x</button>
        </div>
        <div className="title">Add An Answer</div>
        <div className="body">
          <label>Name:<input value={name} placeholder="username ..." onChange={(e) => { setName(e.target.value) }}></input></label>
          <label>Answer:<input value={answer} placeholder="add a answer ..." onChange={(e) => { setAnswer(e.target.value) }}></input></label>
          <label>Email:<input value={email} placeholder="email ..." onChange={(e) => { setEmail(e.target.value) }}></input></label>
          <label>Photos:<button>upload photots</button></label>
        </div>
        <div className="footer">
          <button onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
  )

}

export default AddAnswer