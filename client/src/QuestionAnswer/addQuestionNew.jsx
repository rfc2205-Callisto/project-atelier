import React from "react";
import axios from 'axios';


function AddQuestionNew(props){


  var [name,setName]=React.useState()
  var [answer,setAnswer]=React.useState()
  var [email,setEmail]=React.useState()

  var handleSubmit = (e) => {
    e.preventDefault();
    props.closeModal();
    var data = {
      "product_id": Number(props.prod_id),
      "body": answer,
      "name": name,
      "email": email
    };

    axios.post('/qa/questions', data).then((res) => {
      console.log('yay Question is added supposely')
      console.log(res.data)
    }).catch((err) => { console.log('there is error in adding question') })
  }


  return (
    <div class="container">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={()=>{props.closeModal()}}>x</button>
        </div>
        <div className="title">Add a Question</div>
        <div className="body">
          <label>Name:<input value={name} placeholder="username ..." onChange={(e)=>{setName(e.target.value)}}></input></label>
          <label>Answer:<input value={answer} placeholder="add answer ..." onChange={(e)=>{setAnswer(e.target.value)}}></input></label>
          <label>Email:<input  value={email} placeholder="email ..." onChange={(e)=>{setEmail(e.target.value)}}></input></label>
          <label>Photos:<button>upload photots</button></label>
        </div>
        <div className="footer">
          <button onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
  )

}

export default AddQuestionNew


// return (
//   <>

//     <button class="addQ" onClick={this.open}>Add Question</button>


//     <Dialog aria-label="Close" style={{ color: "blue" }} isOpen={this.state.showDialog} onDismiss={this.close}>
//       <p>My text is blue because the style prop got applied to the div</p>
//       <input value={this.state.name} placeholder="username ..." onChange={(e) => { this.setState({ name: e.target.value }) }} />
//       <input value={this.state.body} placeholder="add answer ..." onChange={(e) => { this.setState({ body: e.target.value }) }} />
//       <input value={this.state.email} placeholder="email ..." onChange={(e) => { this.setState({ email: e.target.value }) }} />
//       <button>Upload picture</button>
//       <button onClick={this.handleSubmit}>Okay</button>
//     </Dialog>
//   </>
// )

// }

// export default AddQuestion