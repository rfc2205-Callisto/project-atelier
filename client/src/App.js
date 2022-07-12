
import React from "react";
import axios from 'axios';
import AppProductDetail from "./productDetails/AppProductDetail.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <AppProductDetail/>
      </>
    );
  }
}

export default App;
