import React from "react"
import store from "./store.js"
import {connect} from "react-redux"

class GalleryScrollBar extends React.Component {
  constructor(props) {
    super(props);

  }

  selectImg(event) {
    var action = {
      type: "changeImage",
      styleID: arguments[0]
    }
    this.props.dispatch(action);
  }

  scrollUp(event) {
    var action = {
      type:"scrollUp"
    }
    this.props.dispatch(action);
  }

  scrollDown(event) {
    var action = {
      type:"scrollDown"
    }
    this.props.dispatch(action);
  }

  render() {
    var scrollUpBtn = [];
    var canscrollup = this.props.lowbound > this.props.minID ? " scrollOK" : "scrollNotOK"
    scrollUpBtn.push(<div class="row rowscrollup"><button class="col-lg-12 scrollbtn" onClick={this.scrollUp.bind(this)}><p class ={canscrollup}>⌃</p></button> </div>)

    var imgListGoesHere = [];
    for (var i = 0; i < this.props.gallery.length; i++) {
      if (this.props.selectedImgID === this.props.gallery[i].style_id) {
        imgListGoesHere.push(
          <div class="row">
            <img class="col-lg-12 scrollbarimg scrollbarimgSelected" src={this.props.gallery[i].url} onClick = {this.selectImg.bind(this,this.props.gallery[i].style_id)}></img>
        </div>)
      } else {
        imgListGoesHere.push(
          <div class="row">
            <img class="col-lg-12 scrollbarimg scrollbarimgUnselected" src={this.props.gallery[i].url} onClick = {this.selectImg.bind(this,this.props.gallery[i].style_id)}></img>
        </div>)
      }


    }

    var scrollDownBtn = [];
    var canscrolldown = this.props.highbound < this.props.maxID ? " scrollOK" : "scrollNotOK"
    scrollDownBtn.push(<div class="row rowscrolldown "><button class="col-lg-12 scrollbtn down"  onClick={this.scrollDown.bind(this)}><p class={canscrolldown}>⌃</p></button> </div>)

    return (
      <div>
        {scrollUpBtn}
        {imgListGoesHere}
        {scrollDownBtn}
      </div>


    )
  }
}

const stateToProps = (state)=>{
  return {
    gallery: state.scrollBarImgURLpartial,
    selectedImgID: state.selectedImgStyleID,
    lowbound: state.scrollmin,
    highbound: state.scrollmax,
    maxID: state.maxStyleID,
    minID: state.minStyleID,
  }
}

export default connect(stateToProps, null)(GalleryScrollBar);