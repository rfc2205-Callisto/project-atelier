import React from "react"
import store from "./store.js"
import Gallery from "./Gallery.jsx"
import GalleryScrollBar from "./GalleryScrollBar.jsx"
import {connect} from "react-redux"

class GalleryModule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var viewingMode = 'col-lg-6';
    if (this.props.fullView) {
      viewingMode = "col-lg-11"
    }

    return (
      <>
        <div class="col-lg-1">
          <GalleryScrollBar/>
        </div>
        <div class={viewingMode}>
          <Gallery/>
        </div>
      </>
    )
  }
}

const stateToProps = (state)=>{

  return {
    fullView: state.fullView
  }
}

export default connect(stateToProps, null)(GalleryModule);