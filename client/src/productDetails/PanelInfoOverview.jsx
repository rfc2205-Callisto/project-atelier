import React from "react"
import store from "./store.js"
import {connect} from "react-redux"

class PanelInfoOverview extends React.Component {
  constructor(props) {
    super(props);
    // console.log('what is props',props);

  }

  clickHandler() {
    // console.log("**clicked**")
    var action = {
      type: "test"
    }
    this.props.dispatch(action)
  }


  render() {
    return (
      <div class="row">
        <div class=" row fs-6 small fw-light">
          {"★★★★☆"} See All Reviews
        </div>
        <div></div>

        <div class="row fs-4 text-secondary text-uppercase text-wrap row-bottom-margin row-bottom-margin">
          {this.props.category}
        </div>

        <div class="row fs-1 fw-bold row-bottom-margin">
          {this.props.name}
        </div>

        <div class="row fs-4">
          {"$"+this.props.price}
        </div>

      </div>
    )
  }
}

const stateToProps = (state)=>{
  // console.log("state to Props,", state)
  return {
    name: state.overview.name,
    category: state.overview.category,
    price: state.overview.default_price
  }
}

export default connect(stateToProps, null)(PanelInfoOverview);