import React from "react"
import store from "./store.js"
import {connect} from "react-redux"

class Gallery extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div class="carousel slide" data-bs-ride="carousel">
        {/* <div class="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
        </div> */}

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={this.props.imgsrc} class="d-block w-100" style="height:100px;width:100px;"/>
          </div>

        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
         </button>

        <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>


    )
  }
}

const stateToProps = (state)=>{
  // console.log("state to Props,", state.selectedStyle.name)
  console.log("on display photo url ",state.photoOnDisplayURL);
  return {
    imgsrc: state.photoOnDisplayURL,
  }
}

export default connect(stateToProps, null)(Gallery);