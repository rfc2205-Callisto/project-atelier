
import React from "react";
import axios from 'axios';
import QA from './QuestionAnswer/qa.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {

    // var config = {
    //   method: 'get',
    //   url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products',
    //   headers: {
    //     'Authorization': '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'
    //   }
    // };

    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

  // }
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}
        </h1>
        <QA />
      </>
    );
  }
}

export default App;
