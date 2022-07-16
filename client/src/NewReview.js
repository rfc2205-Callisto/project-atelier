import React from "react";
import axios from 'axios';
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
      chars: {}
    }
  }


  componentDidMount() {
    console.log('NewReview is Mounted :)');
    this.charMounter();
  }

  charMounter = () => {
    var obj = this.props.chars;
    var chars = {};
    for (var key in obj) {
      chars[obj[key].id] = obj[key].value;
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
    var val = e.target.value;
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

  render() {

      return (
        <div>
          <Modal id='reviewModal' show={this.props.submit} onHide={this.close}>
            <Modal.Header>
              <Button onClick={this.close}>X</Button>
            </Modal.Header>
            <Modal.Body>
              <span>Product Id {this.props.id}<br/></span>
              <span>Rating*<span id='01' onClick={this.ratingHandler}>☆</span><span id='02' onClick={this.ratingHandler}>☆</span><span id='03' onClick={this.ratingHandler}>☆</span><span id='04' onClick={this.ratingHandler}>☆</span><span id='05' onClick={this.ratingHandler}>☆</span><br/></span>
              <span><br/>Short Summary <input onChange={this.summaryHandler} size="60" maxlength="60" placeholder='60 Characters Max' /><br/></span>
              <form>Recommended?* <input onClick={this.recommendHandlerYes} type='radio' value='true' name='yon' id='Yes'/><label for='Yes'>&nbsp;Yes&nbsp;</label>
              <input onClick={this.recommendHandlerNo} type='radio' value='false' name='yon' id='No' /><label for='No'>&nbsp;No&nbsp;</label><br/></form>
              <span>Characteristics* <div>{this.charMapper()}</div><br/></span>
              <span>Your Review* <textarea onChange={this.bodyHandler} placeholder='Why did you like the product or not?' maxlength="1000"/><br/></span>
              <span> Photos <input type='file' placeholder='test' /><br/></span>
              <span>Nickname* <input placeholder='test' /><br/></span>
              <span>Email* <input placeholder='test' /><br/></span>
            </Modal.Body>
          </Modal>
        </div>
      );
    }

  }


export default NewReview;
