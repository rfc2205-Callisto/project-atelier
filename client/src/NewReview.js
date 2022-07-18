import React from "react";
import axios from 'axios';
import {Image} from 'cloudinary-react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import stars from './stars.js'

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      summary: '',
      body: '',
      recommend: true,
      chars: {},
      photos: [],
      pics: [],
      nickname: '',
      email: '',
      validator: false
    }
  }


  componentDidMount() {
    console.log('NewReview is Mounted :)');
    this.charMounter();
  }

  submitReview = (e) => {
    e.preventDefault();
    var check = this.reviewValidator();
    if (check !== 1) {
      return
    } else {
    var options = {
      method: 'post',
      url: '/reviews',
      params: {
        'product_id': this.props.id,
        'rating': this.state.rating,
        'summary': this.state.summary,
        'body': this.state.body,
        'recommend': this.state.recommend,
        'name': this.state.nickname,
        'email': this.state.email,
        'photos': this.state.pics,
        'characteristics': this.state.chars
      }
    };
    axios(options)
      .then(() => {
        console.log('Posted!')
      })
      .catch((error) => {
        console.log('axios request error', error);
      });
      this.props.close()
    }
  }

  reviewValidator = () => {
    var errorArray = [];
    if (this.state.body.length < 50) {
      errorArray.push(' Review Body must be at least 50 characters')
    }
    if (this.state.body.length > 1000) {
      errorArray.push(' Review Body must be less than 1000 characters')
    }
    if (this.state.email.indexOf('@') === -1) {
      errorArray.push(' Email must be valid')
    }
    if (this.state.rating === 0) {
      errorArray.push(' Star Rating must be selected')
    }
    if (this.state.pics.length >= 5) {
      errorArray.push(' You can submit a maximum of 5 photos')
    }
    if (errorArray.length === 0) {
      return 1
    } else {
      alert('Check the following: ' + errorArray)
    }
  }

  charMounter = () => {
    var obj = this.props.chars;
    var chars = {};
    for (var key in obj) {
      var newKey = `${obj[key].id}`
      chars[newKey] = obj[key].value;
    }
    this.setState({
      chars: chars
    })
  }

  close = (e) => {
    e.preventDefault();
    this.props.close()
  }

  ratingHandler = (e) => {
    e.preventDefault();
    var id = e.target.id;
    var arrayOfChange = [];
    this.setState({
      rating: Number(id)
    })
    if (e.target.innerHTML === '⭐') {
      e.target.innerHTML = '☆';
      if (id === '01') {
        document.getElementById('02').innerHTML = '☆';
        document.getElementById('03').innerHTML = '☆';
        document.getElementById('04').innerHTML = '☆';
        document.getElementById('05').innerHTML = '☆';
      }
      if (id === '02') {
        document.getElementById('03').innerHTML = '☆';
        document.getElementById('04').innerHTML = '☆';
        document.getElementById('05').innerHTML = '☆';
      }
      if (id === '03') {
        document.getElementById('04').innerHTML = '☆';
        document.getElementById('05').innerHTML = '☆';
      }
      if (id === '04') {
        document.getElementById('05').innerHTML = '☆';
      }
    } else {
      e.target.innerHTML = '⭐';
      if (id === '02') {
        document.getElementById('01').innerHTML = '⭐';
      }
      if (id === '03') {
        document.getElementById('01').innerHTML = '⭐';
        document.getElementById('02').innerHTML = '⭐';
      }
      if (id === '04') {
        document.getElementById('01').innerHTML = '⭐';
        document.getElementById('02').innerHTML = '⭐';
        document.getElementById('03').innerHTML = '⭐';
      }
      if (id === '05') {
        document.getElementById('01').innerHTML = '⭐';
        document.getElementById('02').innerHTML = '⭐';
        document.getElementById('03').innerHTML = '⭐';
        document.getElementById('04').innerHTML = '⭐';
        document.getElementById('05').innerHTML = '⭐';
      }
    }
  }

  summaryHandler = (e) => {
    e.preventDefault();
    var value = e.target.value;
    this.setState({
      summary: value
    })
  }

  bodyHandler = (e) => {
    e.preventDefault();
    var value = e.target.value;
    this.setState({
      body: value
    })
  }

  recommendHandlerYes = (e) => {
    this.setState({
      recommend: true
    })
  }
  recommendHandlerNo = (e) => {
    this.setState({
      recommend: false
    })
  }

  handleCharChange = (e) => {
    var val = Number(e.target.value);
    var charVal = this.state.chars;
    charVal[this.props.chars[e.target.id].id] = val;
    this.setState({
      chars: charVal
    })
  }

  charMapper = () => {
    var obj = this.props.chars;
    var list = [];
    for (var key in obj) {
      list.push(<div>{key}<input onChange={this.handleCharChange}type='range' min="1" max="5" value={this.state.chars[obj[key].id]} id={key}/></div>)
    }
    return<form>{list}</form>
  }

  nicknameHandler = (e) => {
    e.preventDefault();
    var value = e.target.value;
    this.setState({
      nickname: value
    })
  }
  emailHandler = (e) => {
    e.preventDefault();
    var value = e.target.value;
    this.setState({
      email: value
    })
  }

  photoHandler = (e) => {
    e.preventDefault();
    var files = e.target.files;
    var photos = [];
    for (var i = 0; i < files.length; i++) {
      photos.push(files[i])
    }
    this.setState({
      photos: photos
    })
  }

  photoSubmitter = (e) => {
    e.preventDefault();

    for (var i = 0; i < this.state.photos.length; i++) {
      let photoData = new FormData();
      let pics = this.state.pics;
      photoData.append("file", this.state.photos[i]);
      photoData.append("upload_preset", "lhjmwl0n");

      axios.post("https://api.cloudinary.com/v1_1/dktim9rur/image/upload", photoData)
      .then((response) =>{
        pics.push(`https://res.cloudinary.com/dktim9rur/image/upload/v1657994011/${response.data.public_id}.jpg`);
       this.setState({
        pics: pics
       })
      })
      .catch(err => console.log(err));
    }
  }

  imgRenderer = () => {
    var list = [];
    for (var i = 0; i < this.state.pics.length; i++) {
      list.push(<img id='thumbnail' src={this.state.pics[i]}/>)
    }
    return <div>{list}</div>
  }
  reviewCounter = () => {
    var num = this.state.body.length;
    while (num < 50) {
      return <div>Minimum required characters left: {50 - num}</div>
    }
      return <div>Minimum Reached</div>
  }
  ratingsPopUp = () => {
    if (this.state.rating === 1) {
      return <div>POOR </div>
    }
    if (this.state.rating === 2) {
      return <div>FAIR </div>
    }
    if (this.state.rating === 3) {
      return <div>AVERAGE </div>
    }
    if (this.state.rating === 4) {
      return <div>GOOD </div>
    }
    if (this.state.rating === 5) {
      return <div>GREAT </div>
    }
  }

  render() {

      return (
        <div>
          <Modal id='reviewModal' show={this.props.submit} onHide={this.close}>
            <Modal.Header> Write your review!
              <Button onClick={this.close}>Close</Button>
            </Modal.Header>
            <Modal.Body>
              <span>Product Id {this.props.id}<br/></span>
              <span>Rating*<span id='01' onClick={this.ratingHandler}>☆</span><span id='02' onClick={this.ratingHandler}>☆</span><span id='03' onClick={this.ratingHandler}>☆</span><span id='04' onClick={this.ratingHandler}>☆</span><span id='05' onClick={this.ratingHandler}>☆</span><br/></span>
              <span style={{'text-align': 'center'}}>{this.ratingsPopUp()}<br/></span>
              <span>Short Summary <input onChange={this.summaryHandler} size="60" maxlength="60" placeholder='Best purchase ever!' /><br/></span>
              <form>Recommended?* <input onClick={this.recommendHandlerYes} type='radio' value='true' name='yon' id='Yes'/><label for='Yes'>&nbsp;Yes&nbsp;</label>
              <input onClick={this.recommendHandlerNo} type='radio' value='false' name='yon' id='No' /><label for='No'>&nbsp;No&nbsp;</label><br/></form>
              <span>Characteristics* <div>{this.charMapper()}</div><br/></span>
              <span>Your Review* <textarea onChange={this.bodyHandler} placeholder='Why did you like the product or not?' maxlength="1000"/><br/></span>
              <span>{this.reviewCounter()}</span>
              <span> Photos <input onChange={this.photoHandler} type='file'  multiple/><button onClick={this.photoSubmitter}>Confirm Pictures</button></span>
              <span>{this.imgRenderer()}</span>
              <span>Nickname* <input onChange={this.nicknameHandler} placeholder='Example: jackson11!' size="60" maxlength="60" /><br/></span>
              <span>For privacy reasons, do not use your full name or email address<br/></span>
              <span>Email* <input size="60" maxlength="60" placeholder='Example: jackson11@email.com' onChange={this.emailHandler} /><br/></span>
              <button onClick={this.submitReview}>Submit Review</button>
            </Modal.Body>
          </Modal>
        </div>
      );
    }

  }


export default NewReview;
