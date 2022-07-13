
import React from "react";
import axios from 'axios';
import QA from './QuestionAnswer/qa.jsx'
import AppProductDetail from "./productDetails/AppProductDetail.jsx"
import config from '../../config.js'
import RR from './RR.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 66642
    }
  }
  componentDidMount() {
    console.log('App is Mounted :)')
  }

  newProductUp = (e) => {
    e.preventDefault();
    this.setState({
      product_id: this.state.product_id +1
    })
  }
  newProductDown = (e) => {
    e.preventDefault();
    this.setState({
      product_id: this.state.product_id -1
    })
  }

  render() {
    const name = this.state.name;
    return (
      <React.Fragment>
        <AppProductDetail/>
        <span>
          <button onClick={this.newProductDown}>-</button>
          <button onClick={this.newProductUp}>+</button>
        </span>
        <RR id={this.state.product_id}/>
        <QA id={this.state.product_id}/>
      </React.Fragment>
    );
  }
}

// axios request example:
    // var config = {
    //   method: 'get',
    //   url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products',
    //   headers: {
    //     'Authorization': 'config.TOKEN'
    //   }
    // };

    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    // axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products',
    //   {headers:{
    //     'Authorization': `token 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` }
    //   })
    //   .then((result) => console.log('data from api', result.data))
    //   .catch((err) => { console.log("here is an error"); console.log(err) })

export default App;
