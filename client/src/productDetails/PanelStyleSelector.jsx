import React from "react"
import store from "./store.js"
import {connect} from "react-redux"

class PanelStyleSelector extends React.Component {
  constructor(props) {
    super(props);
    // console.log('what is props',props);
    // store.subscribe()
    this.state = {selectedID: this.props.selectedStyleID};

  }

  selectTN(event) {
    // console.log("**clicked**",this.props.selectedStyleID, event.target.id)
    var action = {
      type: "changeStyle",
      newID: event.target.id
    }
    this.props.dispatch(action)
  }




  render() {
    var styleTNGoesHere=[];
    // console.log("***???***",~~(this.props.styles.length/4)+1)

    for (var i = 0; i < ~~(this.props.styles.length/4)+1;i++) {

      var styleRow = [];

      var upperLimit = Math.min(i*4+4,this.props.styles.length)
      // console.log("upperlimit",upperLimit)
      for (var j = i*4; j< upperLimit; j++) {
        // console.log(this.props.styles[j].thumbnail_url)
        // console.log("i=", i, ", j=", j);
        // console.log(this.props.styles[j]["thumbnail_url"]);
        // console.log(this.props.selectedStyleID, this.props.styles[j].style_id)
        if(this.props.selectedStyleID === this.props.styles[j].style_id) {
          // console.log("YES")

          var isSelected = ' thumbnailselected'
        } else {
          // console.log("NO")
          var isSelected = ''
        }
        styleRow.push(<img onClick={this.selectTN.bind(this)} src={this.props.styles[j]["thumbnail_url"]} class={"col-lg-3 thumbnail "+isSelected} id={this.props.styles[j].style_id}></img>)
        // console.log("styleRow",styleRow)
      }
      styleTNGoesHere.push(
        <div class="row">
          {styleRow}
        </div>
      )
    }
    return (
      <div class="row">
        <div class="row">
          <div class="col-lg-3 fs-5 fw-bold text-uppercase">
            {"Style >"} </div>
          <div class="col-lg-2 fs-5 fw-light text-uppercase">{this.props.name} </div>
        </div>
        <div class="row">
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
    selectedStyleID: parseInt(state.selectedStyleID)
  }
}

export default connect(stateToProps, null)(PanelStyleSelector);