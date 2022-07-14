import React from "react";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import stars from './stars.js'

class RR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      count: 2,
      sort: 'helpful',
      all: [],
      length: 0,
      show: false,
      modesrc: '',
      characteristics: {},
      ratings: {},
      recommends: {}
    }
  }
// ********* AXIOS REQUESTS **********
  allResults = (page, count, sort) => {
    var options = {
      method: 'get',
      url: '/reviews',
      params: {
        'page': page,
        'count': count,
        'sort': sort,
        'product_id': this.props.id
      }
    };
    axios(options)
    .then((response) => {
      this.setState({
        length: response.data.results.length,
        all: response.data.results
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getCharacteristics = () => {
    var options = {
      method: 'get',
      url: '/reviews/meta',
      params: {
        'product_id': this.props.id
      }
    };
    axios(options)
    .then((response) => {
      console.log('CHARACTERISTICS RESPONSE', response.data)
      this.setState({
        ratings: response.data.ratings,
        recommends: response.data.recommended,
        characteristics: response.data.characteristics
      })
    })
    .catch((error) => {
      console.log('axios request error',error);
    });
  }

// ********* LifeCycle Methods ***********
  componentDidMount() {
    console.log('RR is Mounted :)')
    this.getCharacteristics();
    this.allResults(this.state.page, 50,
      this.state.sort);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      this.allResults(this.state.page, 50, this.state.sort);
      console.log('UPDATED')
    }
    if (prevState.sort !== this.state.sort) {
      this.allResults(this.state.page, 50, this.state.sort);
      console.log('UPDATED')
    }
    if (prevProps.id !== this.props.id)  {
      this.getCharacteristics();
      this.allResults(this.state.page, 50, this.state.sort);
      // this.allResults();
      console.log('UPDATED')
    }
  }
// ************* Checker Functions ************
  longBodyChecker = (result) => {
    if (result.body.length > 250) {
      return <p className={result.body} id={result.review_id}>{result.body.slice(0, 250) + '...'}<button onClick={this.fullReviewButton}>Show Full Review</button></p>;
    } else {
      return <p>{result.body}</p>;
    }}
  recommendChecker = (result) => {
    if (result.recommend === false) {
      return null;
    } else {
      return <span>✅&nbsp;&nbsp;I recommend this product!</span>
    }
  }
  responseChecker = (result) => {
    if (result.response === null || result.response === '') {
      return null;
    } else {
      return <p id='response'>{`Response from Seller:\n${result.response}`}</p>
    }
  }
// ********* On Click Functions ************
  thumbClick = (e) => {
    e.preventDefault();
    this.setState({
      show: true,
      modesrc: e.target.src
    })
  }
  thumbClose = () => {
    this.setState({
      show: false
    })
  }
  fullReviewButton = (e) => {
    e.preventDefault();
    document.getElementById(e.target.parentElement.id).innerHTML = e.target.parentElement.className;
  }
  moreReviews = (e) => {
    e.preventDefault();
    this.setState({
      count: this.state.count + 2
    })
  }
  writeReview = (e) => {
    e.preventDefault();
    alert('This button doesn\'t work yet')
  }
  changeSortHelp = (e) => {
    e.preventDefault();
    this.setState({
      sort: 'helpful'
    })
  }
  changeSortRel = (e) => {
    e.preventDefault();
    this.setState({
      sort: 'relevant'
    })
  }
  changeSortNew = (e) => {
    e.preventDefault();
    this.setState({
      sort: 'newest'
    })
  }
// ******* Averaging Functions *****
  avRat = () => {
    var total = 0;
    var sum = 0;
    var obj = this.state.ratings;
    for (var key in obj) {
      total += Number(obj[key]);
      sum +=  Number(obj[key]) * key;
    }
    return  Math.ceil(sum/total * 10) / 10;
    // var sum = 0;
    // this.state.all.forEach((result) => {
    //   sum += result.rating;
    // })
    // var ave = (sum / this.state.length);
    // return  Math.ceil(ave * 10) / 10;
  }

  avRec = () => {
    if (this.state.recommends.false === undefined) {
      return 100;
    }
    var total = Number(this.state.recommends.true) + Number(this.state.recommends.false);
    return Math.ceil(this.state.recommends.true/total * 100);
  }
// ***** Mapper Functions *******
resultsMapper = () => {
  var list = [];
  var count = this.state.count;
  for (var i = 0; i < count; i ++) {
    var review = this.state.all[i];
    if (review === undefined) {
      return;
    }
    list.push(<div id='rrtile' key={review.review_id}>
      <h1>{stars[review.rating]}</h1>
      <h2>{review.summary}</h2>
    <div>{this.longBodyChecker(review)}</div>
    <div>Reviewed On: {review.date} By: {review.reviewer_name}</div>
    <div>{this.recommendChecker(review)}</div>
    <div>{this.responseChecker(review)}</div>
    <div>Helpfulness: {review.helpfulness}</div>
    <div>{review.photos.map((photo) => {
      return <span key={photo.id}><img onClick={this.thumbClick} id='thumbnail' src={photo.url} width={200} height={200}/></span>
    })}</div>
    </div>)
  }

  return <div>{list}</div>
}

ratingsMapper = () => {
  var list = [];
  var total = 0;
  var obj = this.state.ratings;
  for (var key in obj) {
    total += Number(obj[key]);
  }
  for (var key in obj) {
    // list.push(<div>{`${key} Stars: ${obj[key]}`} votes, {Math.floor(Number(obj[key])/total*100)}%</div>)
    list.push(<div>{key} Star  <progress value ={Math.floor(Number(obj[key])/total*100)} max = "100"/></div>)
  }
  return <div>{list}</div>
}
// *********------------*********------------*********------------*********------------ //
  render() {
    if (this.state.length > this.state.count) {
      var button = <button onClick={this.moreReviews}>Show More Reviews</button>;
    } else {
      var button = null;
    }

    if (this.state.all.length > 0) {
      return (
        <div>
          <Modal id='modal' show={this.state.show} onHide={this.thumbClose}>
            <Modal.Header>
              <Button onClick={this.thumbClose}>X</Button>
            </Modal.Header>
            <Modal.Body><img id='picture' src={this.state.modesrc} /></Modal.Body>
          </Modal>
          <h1>
            Ratings and Reviews
          </h1>
          <div>{this.avRat()} Star Average</div>
          <div class='ratings'>
            <div class='empty-stars'></div>
            <div class='full-stars' style={{ width: `${this.avRat() / 5 * 100}%` }}></div>
          </div>
          <div>{`${this.avRec()}% of reviewers recommend this product`}</div>
          <div>{this.ratingsMapper()}</div>
          <div>{`${this.state.length} Reviews sorted by`}
            <DropdownButton id="dropdown-basic-button" title={this.state.sort.toUpperCase()}>
              <Dropdown.Item onClick={this.changeSortHelp}>Helpful</Dropdown.Item>
              <Dropdown.Item onClick={this.changeSortRel}>Relevant</Dropdown.Item>
              <Dropdown.Item onClick={this.changeSortNew}>Newest</Dropdown.Item>
            </DropdownButton>
          </div>
          <div>{this.resultsMapper()}</div>
          <span id='reviewButtons'>
            <div>{button}</div>
            <button onClick={this.writeReview}>Write a Review</button></span>
        </div>
      );
    }
    else {
      return <button onClick={this.writeReview}>Write a Review</button>
    }
  }
}

export default RR;
