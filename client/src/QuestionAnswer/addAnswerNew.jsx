import React from "react";
import axios from 'axios';


var AddAnswer = (props) => {


  var [name, setName] = React.useState();
  var [answer, setAnswer] = React.useState();
  var [email, setEmail] = React.useState();
  var [photos,setPhotos]=React.useState([]);

  var fileUpload=(e)=> {
    const inputElement = document.getElementById("input");
    var files=Object.values(inputElement.files);
    var urls=files.map((file)=>{return window.URL.createObjectURL(file)});
    setPhotos(urls);
    console.log(urls)
  }

  var handleSubmit = (e) => {
    e.preventDefault();
    props.closeModal(e);
    var data = {
      "body": answer,
      "name": name,
      "email": email,
      "photo": photos
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
          {/* <label>Photo:<input type="file" id="input" multiple onChange={fileUpload}></input></label> */}
          <label>Photo:<input id="input" onChange={(e) => { setPhotos([e.target.value]) }}></input></label>
        </div>
        <div className="footer">
          <button onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
  )

}

export default AddAnswer