
import React from "react";
import axios from 'axios';
import config from '../../config.js'
import RR from './RR.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Zach',
      product_id: 66645
    }
  }
  componentDidMount() {
    console.log('App is Mounted :)')
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
  }
  render() {
    const name = this.state.name;
    return (
      <React.Fragment>
        <h1>
          Hello {name}, Ratings and Reviews go here v
        </h1>
        <RR id={this.state.product_id}/>
      </React.Fragment>
    );
  }
}

export default App;
