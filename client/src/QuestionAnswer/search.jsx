import React from "react";
import axios from 'axios';

import QuestionList from './questionList.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: '',
      result: []
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    var allResult = this.props.qList.related;
    console.log(allResult)

    var related = [];
    for (var i = 0; i < allResult.length; i++) {
      if (allResult[i].question_body.includes(this.state.entry)) {
        related.push(allResult[i]);
      }
    }

    this.props.searchFun(related)
  }

  render() {
    return (
      <div class="container">
        <form class="search">
          <input class="searchBar" value={this.state.entry} placeholder="search ..." onChange={(e) => { this.setState({ entry: e.target.value }) }}></input>
          <button class="searchButton" onClick={this.handleClick}>Search</button>
        </form>
        {/* <QuestionList relatedQ={this.state.result}/> */}
      </div>
    )
  }
}

export default Search