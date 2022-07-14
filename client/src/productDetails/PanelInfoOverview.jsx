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
    var pricetag = []
    if (!this.props.actualPrice) {
      pricetag.push(
        <div class="row fs-4">
          <span class="col-lg-2 pricetag">{"$"+this.props.price}</span>
        </div>
      )
    } else {
        pricetag.push(
          <div class="row fs-4">
            <span class="col-lg-2 oldprice">{"$"+this.props.price}</span>
            <span class="col-lg-2 pricetag">{"$"+this.props.actualPrice}</span>
          </div>)
      }

    return (
      <div class="row infoOverview">
        <a class=" row fs-6 small fw-light anchorLink" href="#rrtile">
          {"★★★★☆"} See All Reviews
        </a>

        <span class="row fs-4 text-secondary text-uppercase productCategory">
          {this.props.category}
        </span>
        <span class="row fs-1 fw-bold productName">
            {this.props.name}
        </span>

        {pricetag}
      </div>
    )
  }
}

const stateToProps = (state)=>{
  console.log("***state to Props,", state.selectedStyle.sale_price)
  return {
    name: state.overview.name,
    category: state.overview.category,
    price: state.selectedStyle.original_price,
    actualPrice: state.selectedStyle.sale_price
  }
}

export default connect(stateToProps, null)(PanelInfoOverview);