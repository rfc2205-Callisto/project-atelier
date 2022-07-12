import React from "react";
import axios from 'axios';
const config = require('../../../config.js');
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      name: '',
      body: '',
      email: ''
    }
  }

  open = () => { this.setState({ showDialog: true }) };
  close = () => { this.setState({ showDialog: false }) };

  handleSubmit = (e) => {
    e.preventDefault();
    this.close();
    var data = {
      "product_id": Number(this.props.prod_id),
      "body": this.state.body,
      "name": this.state.name,
      "email": this.state.email
    };

    axios.post('/qa/questions',data).then((res) => {
      console.log('yay Question is added supposely')
      console.log(res.data)
    }).catch((err) => { console.log('there is error in adding question') })
  }


  render() {
    return (
      <div>

        <button onClick={this.open}>Add Question</button>

        <Dialog aria-label="Close" style={{ color: "blue" }} isOpen={this.state.showDialog} onDismiss={this.close}>
          <p>My text is blue because the style prop got applied to the div</p>
          <input value={this.state.name} placeholder="username ..." onChange={(e) => { this.setState({ name: e.target.value }) }} />
          <input value={this.state.body} placeholder="add answer ..." onChange={(e) => { this.setState({ body: e.target.value }) }} />
          <input value={this.state.email} placeholder="email ..." onChange={(e) => { this.setState({ email: e.target.value }) }} />
          <button>Upload picture</button>
          <button onClick={this.handleSubmit}>Okay</button>
        </Dialog>
      </div>
    )
  }
}

export default AddQuestion