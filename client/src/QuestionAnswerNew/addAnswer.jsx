import React from "react";
import axios from 'axios';
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      name:'',
      body:'',
      email:'',
      photo:[]
    }
  }

  open = () => { this.setState({ showDialog: true }) };
  close = () => { this.setState({ showDialog: false }) };

  handleSubmit = (e) => {
    e.preventDefault();
    this.close();
    var data = {
      "body": this.state.body,
      "name": this.state.name,
      "email": this.state.email,
      "photo":this.state.photo
    };

    axios.post(`/qa/questions/${Number(this.props.quest_id)}/answers`,data).then((result) => {
      conosle.log('yay Answer is added supposely')
      console.log(result.data)
    }).catch((err) => { console.log('there is error in adding answer') })
  }

  render() {
    return (
      <>
        <button onClick={this.open}>Add Answer</button>

        <Dialog aria-label="Close" style={{ color: "red" }} isOpen={this.state.showDialog} onDismiss={this.close}>
          <p>My text is red because the style prop got applied to the div</p>
          <input value={this.state.name} placeholder="username ..." onChange={(e) => { this.setState({ name: e.target.value }) }}></input>
          <input value={this.state.body} placeholder="add answer ..." onChange={(e) => { this.setState({ body: e.target.value }) }}/>
          <input value={this.state.email} placeholder="email ..." onChange={(e) => { this.setState({ email: e.target.value }) }}/>
          <button>Upload picture</button>
          <button onClick={this.handleSubmit}>Okay</button>
        </Dialog>
      </>
    )
  }
}

export default AddAnswer