import React from "react";
import reactDOM from 'react-dom';
import axios from 'axios';

//for redux
import { useSelector, useDispatch, connect } from 'react-redux';
import allActions from '../Actions';

//other components
import Search from './search.js'
import QuestionList from './questionList.js';
import AddQuestion from './addQuestion.js';


class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showNewQ: false }
  }

  fetchData = () => {
    var apiReq = {
      method: 'get',
      url: '/qa/questions',
      params: {
        product_id: `${this.props.id}`,
        count: 20
      }
    };
    axios(apiReq).then((data) => {
      var sortQ = data.data.results.sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1);
      var initState = allActions.qaAction.initialize(sortQ);
      this.props.dispatch(initState);
      console.log(sortQ)
    }).catch(() => { console.log('there is error in api get request') })
  }

  componentDidMount() {
    this.props.dispatch(allActions.qaAction.assignID(this.props.id));
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.props.dispatch(allActions.qaAction.assignID(this.props.id));
      this.fetchData();
    }
  }

  render() {
    var newQ;
    if (this.props.allQ.length === 0) {
      newQ = (
        <>
          {this.state.showNewQ && <AddQuestion closeModal={() => { this.setState({ showNewQ: false }) }} />}
          <button className="addQ" onClick={() => { this.setState({ showNewQ: true }) }}>Submit New Question</button>
        </>
      )
    } else {
      newQ = (
        <>
          <Search />
          <QuestionList />
        </>)
    }
    return (
      <>
        <h3>Questions and Answers session</h3>
        {newQ}
      </>

    );
  }
};

var mapStateToProps = (state) => {
  console.log(state)
  console.log(state.product_id)
  return {
    product_id: state.product_id,
    allQ: state.allQ
  };
};

export default connect(mapStateToProps)(QA)

