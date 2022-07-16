import React from "react";
import reactDOM from 'react-dom';
import axios from 'axios';

//for redux
import { useSelector, useDispatch, connect } from 'react-redux';
import allActions from '../Actions';

//other components
import Search from './search.js'
import QuestionList from './questionList.js'


class QA extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchData = () => {
    var apiReq = {
      method: 'get',
      url: '/qa/questions',
      params: {
        product_id: `${this.props.product_id}`,
        count: 20
      }
    };
    axios(apiReq).then((data) => {
      var sortQ = data.data.results.sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1);
      var initState = allActions.qaAction.initialize(sortQ);
      this.props.dispatch(initState);
    }).catch(() => { console.log('there is error in api get request') })
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    // console.log()
    return (
      <>
        <h3>Questions and Answers session</h3>
        <Search />
        <QuestionList />
      </>

    );
  }
};

var mapStateToProps = (state) => {
  console.log(state)
  console.log(state.product_id)
  return {
    product_id: state.product_id
  };
};

export default connect(mapStateToProps)(QA)

