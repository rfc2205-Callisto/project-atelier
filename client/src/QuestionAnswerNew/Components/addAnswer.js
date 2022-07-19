import React, { useState } from 'react';
import axios from 'axios';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';

var AddAnswer = (props) => {


  var [name, setName] = React.useState();
  var [answer, setAnswer] = React.useState();
  var [email, setEmail] = React.useState();
  var [photos, setPhotos] = React.useState([]);
  var [previewPhoto, setPreviewPhoto] = React.useState();

  var preview = (e) => {
    const files = Object.values(e.target.files)

    setPreviewPhoto(
      <>
        {files.map((file) => {
          var source = URL.createObjectURL(file);
          return <img className='prePhoto' src={source}></img>
        })}
      </>
    )

  }
  var handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert('name is required')
    } else if (!answer) {
      alert('answer cannot be empty')
    } else if (!email.length) {
      alert('email is required')
    } else {
      props.closeModal(e);
      var pictures = Object.values(photos).slice(0, 5)

      var cloudPost = [];
      pictures.forEach((item) => {
        var formData = new FormData();
        formData.append("file", item)
        formData.append("upload_preset", presetName)

        cloudPost.push(axios.post("https://api.cloudinary.com/v1_1/dls2rxfqj/image/upload", formData))

      })
      Promise.all(cloudPost).then((resProm) => {
        console.log(resProm)
        var url = resProm.map((item) => {
          return item.data.url;
        });
        var data = {
          "body": answer,
          "name": name,
          "email": email,
          "photos": url
        };
        axios.post(`/qa/questions/${props.quest_id}/answers`, data)
          .then((result) => {
            conosle.log('yay Answer is added supposely');
          })
          .catch((err) => { console.log('there is error in adding answer') });
      })
    }





  };

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
          <label>Photo:<input className="photoUpload" id="imgInput" type="file" id="input" multiple onChange={preview}></input></label>
          {/* <label>Preview: <img className="prePhoto" id="blah" src="#" alt="your image"></img></label> */}
          <label>Preview:{previewPhoto}</label>
        </div>
        <div className="footer">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )

}

export default AddAnswer
{/* <label>Photo:<input id="input" onChange={(e) => { setPhotos([e.target.value]) }}></input></label> */ }