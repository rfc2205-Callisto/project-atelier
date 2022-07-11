import React from "react";
import axios from 'axios';
import config from '../../config.js'

class RR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      count: 2,
      sort: 'helpful',
      results: [],
      length: 0
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
    console.log('UPDATED')
    if (prevState.count !== this.state.count) {
      this.fetchReviews(this.state.page, this.state.count, this.state.sort);
    }
  }

  resultsMapper = () => {
    return this.state.results.map((result) => {
      return <div key ={result.review_id}>
        <h1>Summary: {result.summary}</h1>
        <h2>{result.response}</h2>
      <p>Body: {result.body}</p>
      <div>Date: {result.date} Name: {result.reviewer_name}</div>
      <div>Helpfulness: {result.helpfulness}</div>
      <ul>{result.photos.map((photo) => {
        return <li key={photo.id}><img src={photo.url}/></li>
      })}</ul>
      </div>
    })
  }

  moreReviews = (e) => {
    e.preventDefault();
    alert(this.state.count);
    this.setState({
      count: this.state.count + 2
    })
  }

  render() {
    if (this.state.length > this.state.count) {
      var button = <button onClick={this.moreReviews}>Show More Reviews</button>;
    } else {
      var button = null;
    }
    console.log(this.state.length)

    if (this.state.results.length > 0) {
      return (
        <React.Fragment>
          <h1>
            Ratings and Reviews
          </h1>
          <div>{this.resultsMapper()}</div>
          <div>{button}</div>
        </React.Fragment>
      );
    }
  }
}

export default RR;
