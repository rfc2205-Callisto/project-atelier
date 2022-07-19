import React from "react"
import store from "./store.js"
import PanelInfoOverview from "./PanelInfoOverview.jsx"
import PanelStyleSelector from "./PanelStyleSelector.jsx"
import PanelAddToCart from "./PanelAddToCart.jsx"
import {connect} from "react-redux"

class PanelModule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var panelModuleGoesHere = [];
    if (!this.props.fullView) {
      panelModuleGoesHere.push(
        <div class="col-lg-5">
          <PanelInfoOverview/>
          <PanelStyleSelector/>
          <PanelAddToCart/>
        </div>
      )
    }

    return (
      <div>
        {panelModuleGoesHere}
      </div>
    )
  }
}

const stateToProps = (state)=>{

  return {
    fullView: state.fullView
  }
}

export default connect(stateToProps, null)(PanelModule);