import React, { useState } from 'react';
import axios from 'axios';
var cloudName='dls2rxfqj';
var presetName='ap4g9ume';

var AddAnswer = (props) => {


  var [name, setName] = React.useState();
  var [answer, setAnswer] = React.useState();
  var [email, setEmail] = React.useState();
  var [photos, setPhotos] = React.useState([]);
  // var [picURL, setPicURL] = React.useState();//not sure why this cannot work??????? need to ask my teammate

  var handleSubmit = (e) => {
    e.preventDefault();
    props.closeModal(e);

    var formData = new FormData();
    formData.append("file", photos[0])
    formData.append("upload_preset", presetName)
    console.log(presetName)

    var url;
    axios.post("https://api.cloudinary.com/v1_1/dls2rxfqj/image/upload", formData)
      .then((response) => {
        url=response.data.url;
      })
      .then(() => {
        var data = {
          "body": answer,
          "name": name,
          "email": email,
          "photos": [`${url}`]
        };
        console.log(data)
        axios.post(`/qa/questions/${props.quest_id}/answers`, data)
          .then((result) => {
            conosle.log('yay Answer is added supposely')
            // console.log(result.data)
          })
          .catch((err) => { console.log('there is error in adding answer') })
      })
  }

  return (
    <div class="container modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={(e) => { props.closeModal(e) }}>x</button>
        </div>
        <div className="title">Add An Answer</div>
        <div className="body">
          <label>Name:<input value={name} placeholder="username ..." onChange={(e) => { setName(e.target.value) }} required></input></label>
          <label>Answer:<input value={answer} placeholder="add a answer ..." onChange={(e) => { setAnswer(e.target.value) }} required></input></label>
          <label>Email:<input type="email" value={email} placeholder="email ..." onChange={(e) => { setEmail(e.target.value) }} required></input></label>
          <label>Photo:<input type="file" id="input" multiple onChange={(e) => { setPhotos(e.target.files) }}></input></label>

          {/* <label>Photo:<input id="input" onChange={(e) => { setPhotos([e.target.value]) }}></input></label> */}
        </div>
        <div className="footer">
          <button onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
  )

}

export default AddAnswer