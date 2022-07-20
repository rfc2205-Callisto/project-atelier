import React from "react"
import store from "./store.js"
import {connect} from "react-redux"

class PanelAddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "SELECT SIZE", quan: 0, addedToCart: false, popover: false, saved: false}
  }

  selectSize(event) {

    this.setState({value:event.target.value},()=>{    console.log("**size selected**",this.state.value, event.target.value)
    var action = {
      type: "changeSize",
      size: event.target.value
    };
    this.props.dispatch(action);
  })
  }
  selectQuan(event) {
    console.log("selected quantity: ", event.target.value)
    this.setState({quan:event.target.value});
  }

  addToBag(event) {
    event.preventDefault();
    console.log("add to cart")
    if (this.state.value === "SELECT SIZE") {
      console.log("Error")
      this.setState({addedToCart: true, popover: false})
    } else {
      console.log("Success")
      this.setState({addedToCart: true, popover: true})
    }

  }
  render() {
    var sizeOptions = []
    sizeOptions.push(<option value="SELECT SIZE">SELECT SIZE</option>)
    for (var key in this.props.sizeNquan) {
      if (this.props.sizeNquan[key].quantity > 0) {
        sizeOptions.push(
          <option id={key} value={this.props.sizeNquan[key].size}>
          {this.props.sizeNquan[key].size}
          </option>)
    } else {
        sizeOptions.push(<option id={key} value={this.props.sizeNquan[key].size} disabled>{this.props.sizeNquan[key].size}</option>)
      }
    }

    var quanOpt = []
    quanOpt.push(<option value="-">---</option>)
    for (var i = 1; i <= Math.min(15,this.props.quantity); i++) {
     quanOpt.push(<option value={i}>{i}</option>)
    }

    var alertGoesHere=[]
    if (this.state.addedToCart) {
      if (this.state.popover) {
        alertGoesHere.push(<div class="alert alert-success col-lg-9">
        <strong>Success!</strong> This has been added to your cart.
      </div>)
      } else {
        alertGoesHere.push(<div class="alert alert-warning  col-lg-9">
        <strong>Warning!</strong> Please select a size first.
      </div>)
      }
    }


    return (
      <div class="row addToCart">
        <form>
            <div class="row">
            <select name="size" id="size" class="col-lg-6 fs-5 fw-light size" onChange={this.selectSize.bind(this)} value={this.state.value}>
              {sizeOptions}

            </select>
            <br></br>
            <select name="quantity" id="quantity" class="col-lg-3 fs-5 fw-light quantity" onChange={this.selectQuan.bind(this)}>
              {quanOpt}
            </select>

            </div>
            <div class="row">
                <button class="col-lg-7 fs-5 fw-light addtobag" onClick={this.addToBag.bind(this)}>
                  ADD TO BAG
                </button>
                <button class="col-lg-2 fs-5 fw-light addtobag">☆</button>
            </div>
            <div class="row">
              {alertGoesHere}
            </div>
        </form>

      </div>
    )
  }
}

const stateToProps = (state)=>{
  // console.log("state to Props,", state.selectedSize);
  return {
    sizeNquan: state.selectedStyleSizeNQuan,
    quantity: state.selectedSize.quantity
  }
}

export default connect(stateToProps, null)(PanelAddToCart);