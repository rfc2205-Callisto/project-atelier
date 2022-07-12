import React from "react";
import axios from 'axios';
import config from '../../config.js';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
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
      results: [],
      length: 0,
      show: false,
      modesrc: ''
    }
  }

  howManyResults = () => {
    var options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews',
      params: {
        'page': 1,
        'count': 50,
        'sort': this.state.sort,
        'product_id': this.props.id
      },
      headers: {
        'Authorization': `${config.TOKEN}`
      }
    };

    axios(options)
    .then((response) => {
      this.setState({
        length: response.data.results.length
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  fetchReviews = (page, count, sort) => {
    var options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews',
      params: {
        'page': page,
        'count': count,
        'sort': sort,
        'product_id': this.props.id
      },
      headers: {
        'Authorization': `${config.TOKEN}`
      }
    };

    axios(options)
    .then((response) => {
      this.setState({
        results: response.data.results
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    console.log('RR is Mounted :)')
    this.fetchReviews(this.state.page, this.state.count,
      this.state.sort);
    this.howManyResults();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      this.fetchReviews(this.state.page, this.state.count, this.state.sort);
      console.log('UPDATED')
    }
    if (prevProps.id !== this.props.id)  {
      this.fetchReviews(this.state.page, 2, this.state.sort);
      this.howManyResults();
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
    document.getElementById('body').innerHTML = e.target.parentElement.className;
  }

  longBodyChecker = (result) => {
    if (result.body.length > 250) {
      return <p className={result.body} id='body'>{result.body.slice(0, 250) + '...'}<button onClick={this.fullReviewButton}>Show Full Review</button></p>;
    } else {
      return <p>{result.body}</p>;
    }}


  resultsMapper = () => {
    return this.state.results.map((result) => {
      return <div id='rrtile' key={result.review_id}>
        <h1>{stars[result.rating]}</h1>
        <h2>{result.summary}</h2>
        <h3>{result.response}</h3>
      <div>{this.longBodyChecker(result)}</div>
      <div>Reviewed On: {result.date} By: {result.reviewer_name}</div>
      <div>Helpfulness: {result.helpfulness}</div>
      <div>{result.photos.map((photo) => {
        return <span key={photo.id}><img onClick={this.thumbClick} id='thumbnail' src={photo.url} width={200} height={200}/></span>
      })}</div>
      </div>
    })
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

  changeSort = (e) => {
    e.preventDefault();
    alert(this.innerHTML)
    // this.setState({
    //   sort:
    // })
  }

  render() {
    if (this.state.length > this.state.count) {
      var button = <button onClick={this.moreReviews}>Show More Reviews</button>;
    } else {
      var button = null;
    }

    if (this.state.results.length > 0) {
      return (
        <React.Fragment>
          <Modal id='modal' show={this.state.show} onHide={this.thumbClose}>
            <Modal.Header>
              <Button onClick={this.thumbClose}>X</Button>
            </Modal.Header>
            <Modal.Body><img id='picture' src={this.state.modesrc} /></Modal.Body>
          </Modal>
          <h1>
            Ratings and Reviews
          </h1>
          <span>{`${this.state.length} Reviews sorted by`}
            <DropdownButton id="dropdown-basic-button" title={this.state.sort}>
              <Dropdown.Item id='action'onClick={this.changeSort}>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </DropdownButton>
          </span>
          <div>{this.resultsMapper()}</div>
          <span id='reviewButtons'>
            <div>{button}</div>
            <button onClick={this.writeReview}>Write a Review</button></span>
        </React.Fragment>
      );
    }
    else {
      return <button onClick={this.writeReview}>Write a Review</button>
    }
  }
}

export default RR;
