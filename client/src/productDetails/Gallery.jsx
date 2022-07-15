import React from "react"
import store from "./store.js"
import {connect} from "react-redux"

class Gallery extends React.Component {
  constructor(props) {
    super(props);

  }

  nextImg(event) {
    console.log("next image")
    if (this.props.currID + 1 > this.props.maxID) {
      var action2 = {
        type: "scrollDown",
      }
      this.props.dispatch(action2)
    }
    var action1 = {
      type: "nextImage",
      currID: this.props.currID
    }
    this.props.dispatch(action1)
  }
  prevImg(event) {
    if (this.props.currID - 1 < this.props.minID) {
      var action2 = {
        type: "scrollUp",
      }
      this.props.dispatch(action2)
    }
    var action = {
      type: "prevImage",
      currID: this.props.currID
    }
    this.props.dispatch(action)
  }

  fullViewMode(event) {
    console.log("want to expand image")
    var action = {
      type: "enterFullView"
    }
    this.props.dispatch(action)
  }
  render() {
    var fullviewMode = this.props.fullView ? "" : "";
    return (
      <div class="carousel slide" data-bs-ride="carousel">

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={this.props.imgsrc} class={"d-block w-100 ondisplayimg"}/>
            <input type="button" class="fullScreenBtn" value = "🀱" onClick={this.fullViewMode.bind(this)}></input>
          </div>

        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev" onClick={this.prevImg.bind(this)}>
          <span class="carousel-control-prev-icon"></span>
         </button>

        <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next" onClick={this.nextImg.bind(this)}>
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>


    )
  }
}

const stateToProps = (state)=>{
  return {
    imgsrc: state.photoOnDisplayURL,
    currID: state.selectedImgStyleID,
    maxID: state.scrollmax,
    minID: state.scrollmin,
  }
}

export default connect(stateToProps, null)(Gallery);