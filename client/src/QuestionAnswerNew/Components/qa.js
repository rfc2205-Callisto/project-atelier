import React from "react";
import reactDOM from 'react-dom';
import axios from 'axios';
// const App=React.createElement("h1",null,"Hello Sharon");
// import Comp1 from './Components/Comp1';//it will find the index.js in the folder
// import Comp2 from './Components/Comp2';
// import Comp3 from './Components/Comp3';
import { useSelector, useDispatch, connect } from 'react-redux';
import allActions from '../../Actions';
const config = require('../../../../config.js');
import Search from './search.js'
import QuestionList from './questionList.js'

class QA extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchData = () => {
    var apiReq = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions',
      headers: {
        'Authorization': `${config.TOKEN}`
      },
      params: { product_id: this.props.product_id }
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

