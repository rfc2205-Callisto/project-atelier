import React from "react";
import axios from 'axios';

import Search from './search.jsx';
import QuestionList from './questionList.jsx';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related: [],
      defQ:2,
      moreQ:false
    }
  }

  fetchData = () => {
    var product_id = 66666;
    var apiReq = {
      method: 'get',
      url: '/qa/questions',
      params: {
        product_id: `${product_id}`,
        count: 20
      }
    };

    axios(apiReq).then((response) => {
      console.log(response.data);
      var data = response.data;
      this.setState({ product_id: data.product_id })
      this.setState({ related: data.results })
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchData();
  }


  handleSearch = (filterResult) => {
    var sortFilter=filterResult.sort((a,b)=>(a.helpfulness>b.helpfulness)?-1:1)

    this.setState({
      related: sortFilter
    })
  }

  handleAddQ=()=>{
    var addCount=this.state.defQ+2;
    this.setState({
      defQ:addCount
    })
  }

  render() {
    return (
      <>
        <h3>Question & Answers</h3>
        <Search className="searchQ" qList={this.state} searchFun={this.handleSearch} />
        <QuestionList key={`Product-${this.state.product_id}`} prod_id={this.state.product_id} allQ={this.state.related}
        relatedQ={this.state.related.slice(0,this.state.defQ)} addQ={this.handleAddQ} />
      </>
    )
  }
}

export default QA