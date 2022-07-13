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
      modesrc: ''
    }
  }

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

  componentDidMount() {
    console.log('RR is Mounted :)')
    this.allResults(this.state.page, this.state.count,
      this.state.sort);
    this.allResults(this.state.page, 50,
      this.state.sort);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      this.allResults(this.state.page, this.state.count, this.state.sort);
      console.log('UPDATED')
    }
    if (prevState.sort !== this.state.sort) {
      this.allResults(this.state.page, this.state.count, this.state.sort);
      console.log('UPDATED')
    }
    if (prevProps.id !== this.props.id)  {
      this.allResults(this.state.page, 2, this.state.sort);
      this.allResults();
      console.log('UPDATED')
    }
  }

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

  resultsMapper = () => {
    var list = []
    var count = this.state.count;
    for (var i = 0; i < count; i ++) {
      var review = this.state.all[i];
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
    // return this.state.results.map((result) => {
    //   return <div id='rrtile' key={result.review_id}>
    //     <h1>{stars[result.rating]}</h1>
    //     <h2>{result.summary}</h2>
    //   <div>{this.longBodyChecker(result)}</div>
    //   <div>Reviewed On: {result.date} By: {result.reviewer_name}</div>
    //   <div>{this.recommendChecker(result)}</div>
    //   <div>{this.responseChecker(result)}</div>
    //   <div>Helpfulness: {result.helpfulness}</div>
    //   <div>{result.photos.map((photo) => {
    //     return <span key={photo.id}><img onClick={this.thumbClick} id='thumbnail' src={photo.url} width={200} height={200}/></span>
    //   })}</div>
    //   </div>
    // })
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

  avRat = () => {
    var sum = 0;
    this.state.all.forEach((result) => {
      sum += result.rating;
    })
    var ave = (sum / this.state.length);
    return  Math.ceil(ave * 10) / 10;
  }

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
          <div>Average Rating = {this.avRat()}</div>
          <span>{`${this.state.length} Reviews sorted by`}
            <DropdownButton id="dropdown-basic-button" title={this.state.sort.toUpperCase()}>
              <Dropdown.Item onClick={this.changeSortHelp}>Helpful</Dropdown.Item>
              <Dropdown.Item onClick={this.changeSortRel}>Relevant</Dropdown.Item>
              <Dropdown.Item onClick={this.changeSortNew}>Newest</Dropdown.Item>
            </DropdownButton>
          </span>
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
