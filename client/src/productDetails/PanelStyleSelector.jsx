import React from "react"
import store from "./store.js"
import {connect} from "react-redux"

class PanelStyleSelector extends React.Component {
  constructor(props) {
    super(props);

  }

  selectTN(event) {
    // console.log("**clicked**",this.props.selectedStyleID, event.target.id)
    var action1 = {
      type: "changeStyle",
      newID: event.target.id
    }
    this.props.dispatch(action1)

    if (event.target.id > this.props.maxID || event.target.id < this.props.minID) {
      var action2 = {
        type: "updateRange",
        currID: event.target.id
      }
      this.props.dispatch(action2)
    }
  }




  render() {
    var styleTNGoesHere=[];
    var styleRow = [];
    for (var j = 0; j< this.props.styles.length; j++) {
        if(this.props.selectedStyleID === this.props.styles[j].style_id) {
          var isSelected = ' thumbnailselected'
        } else {
          var isSelected = ''
        }
        styleRow.push(<img onClick={this.selectTN.bind(this)} src={this.props.styles[j]["thumbnail_url"]} class={"col-lg-3 thumbnail "+isSelected} id={this.props.styles[j].style_id}></img>)
      }
      styleTNGoesHere.push(
        <div class="row aRowOfStyle">
          {styleRow}
        </div>
      )
    // for (var i = 0; i < ~~(this.props.styles.length/4)+1;i++) {

    //   var styleRow = [];

    //   var upperLimit = Math.min(i*4+4,this.props.styles.length)
    //   for (var j = i*4; j< upperLimit; j++) {
    //     if(this.props.selectedStyleID === this.props.styles[j].style_id) {
    //       var isSelected = ' thumbnailselected'
    //     } else {
    //       var isSelected = ''
    //     }
    //     styleRow.push(<img onClick={this.selectTN.bind(this)} src={this.props.styles[j]["thumbnail_url"]} class={"col-lg-3 thumbnail "+isSelected} id={this.props.styles[j].style_id}></img>)
    //   }
    //   styleTNGoesHere.push(
    //     <div class="row aRowOfStyle">
    //       {styleRow}
    //     </div>
    //   )
    // }
    return (
      <div class="row styleSelector">
        <div class="row twoRowOfStyles">
          <div class="col-lg-3 fs-5 fw-bold text-uppercase styleName">
            {"Style>"} </div>
          <div class="col-lg-1 fs-5 fw-light text-uppercase styleName">{this.props.name} </div>
        </div>
        <div class="row twoRowOfStyles">
          {styleTNGoesHere}
        </div>
      </div>
    )
  }
}

const stateToProps = (state)=>{
  // console.log("state to Props,", state.selectedStyle.name)
  return {
    name: state.selectedStyle.name,
    styles: state.scrollBarImgURL,
    selectedStyleID: parseInt(state.selectedStyleID),
    maxID: state.scrollmax,
    minID: state.scrollmin,
    interval: state.interval
  }
}

export default connect(stateToProps, null)(PanelStyleSelector);