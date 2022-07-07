
import React from "react";
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

    var config = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products',
      headers: {
        'Authorization': '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'
      }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    // axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products',
    //   {headers:{
    //     'Authorization': `token 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` }
    //   })
    //   .then((result) => console.log('data from api', result.data))
    //   .catch((err) => { console.log("here is an error"); console.log(err) })
  }
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}
        </h1>
      </>
    );
  }
}

export default App;
