import React from "react"
import store from "./store.js"
import {connect} from "react-redux"

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var featuresGoesHere=[];
    // console.log(this.props.features);
    for (var i = 0; i < this.props.features.length; i++) {
      // console.log(this.props.features[i].feature)
      featuresGoesHere.push(<div class="row fs-5 row-feature">{"  ✓"} {this.props.features[i].feature}</div>)
    }
    return (
      <div class="row ">
        <div class="col-lg-1">

        </div>
        <div class="col-lg-6 col-description">
          <p class="fs-5 fw-bold lh-0">{this.props.slogan}</p>
          <p class="fs-5 fw-light lh-0">{this.props.description}</p>
        </div>
        <div class="col-lg-5 col-feature">
          {featuresGoesHere}
        </div>

      </div>
    )
  }
}

const stateToProps = (state)=>{
  // console.log("state to Props,", state)
  return {
    slogan: state.overview.slogan,
    description: state.overview.description,
    features: state.overview.features
  }
}

export default connect(stateToProps, null)(Overview);