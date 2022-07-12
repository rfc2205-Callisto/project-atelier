import React from "react";
import axios from 'axios';
const config = require('../../../config.js');
import QuestionList from './questionList.jsx';

//if need to use token
//`${config.TOKEN}`
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
    var allResult = this.props.qList.data.results;
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
      <>
        <form>
          <input value={this.state.entry} placeholder="search ..." onChange={(e) => { this.setState({ entry: e.target.value }) }}></input>
          <button onClick={this.handleClick}>Search</button>
        </form>
        {/* <QuestionList relatedQ={this.state.result}/> */}
      </>
    )
  }
}

export default Search