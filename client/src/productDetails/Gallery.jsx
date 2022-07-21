import React from "react"
import store from "./store.js"
import {connect} from "react-redux"

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {top: 0, left: 0, entered: false}

  }

  nextImg(event) {
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
    var action = {
      type: "enterFullView"
    }
    this.props.dispatch(action)

  }

  panUp(event){
    if (this.state.top < 0) {
      this.setState({top: this.state.top + 10});
    }
  }

  panDown() {
    if (this.state.top > (-this.props.hmax+480)) {
      this.setState({top: this.state.top - 10});
    }
  }

  panLeft(event){
    if (this.state.left < 0) {
      this.setState({left: this.state.left + 10});
    }
  }

  panRight(event){
    if (this.state.left > -this.props.ymax+1186) {
      this.setState({left: this.state.left - 10});
    }
  }
  getSize({target: img}) {

    const {offsetHeight, offsetWidth} = img
    var action = {type: "setImgDimensions",hmax: offsetHeight, ymax: offsetWidth}
    this.props.dispatch(action);
    this.setState({top: ~~(-offsetHeight/2), left: ~~(-offsetWidth/2)+560})

  }


  render() {
    var marginTop = JSON.stringify(this.state.top) + "px";
    var marginLeft = JSON.stringify(this.state.left) + "px";

    var imageGoesHere = []
    if (!this.props.fullView) {
      // imageGoesHere.push(<input type="button" class="panUp" value="Pan Up"></input>)
      imageGoesHere.push(<img src={this.props.imgsrc} class="ondisplayimg"/>)

    } else {
      imageGoesHere.push(
      <div class="ondisplayimg">
        <input type="button" class="pan panUp" value="▲" onMouseMove = {this.panUp.bind(this)}></input>
        <input type="button" class="pan panLeft" value="◀︎" onMouseMove = {this.panLeft.bind(this)}></input>
        <img src={this.props.imgsrc} style={{"margin-top": marginTop,"margin-left":marginLeft}} onLoad={this.getSize.bind(this)}/>
        <input type="button" class="pan panDown" value="▼" onMouseMove = {this.panDown.bind(this)}></input>
        <input type="button" class="pan panRight" value="►" onMouseMove = {this.panRight.bind(this)}></input>
      </div>)

    }
    return (
      <div class="carousel slide" data-bs-ride="carousel">

        <div class="carousel-inner">
          <div class="carousel-item active">

            {imageGoesHere}
            <input type="button" class="fullScreenBtn" value = "🀱" onClick={this.fullViewMode.bind(this)} ></input>
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
    fullView: state.fullView,
    ymax: state.ymax,
    hmax: state.hmax
  }
}

export default connect(stateToProps, null)(Gallery);