import React from "react"
import store from "./store.js"
import axios from "axios"
import PanelInfoOverview from "./PanelInfoOverview.jsx"
import PanelStyleSelector from "./PanelStyleSelector.jsx"
import PanelAddToCart from "./PanelAddToCart.jsx"
import Gallery from "./Gallery.jsx"
import Overview from "./Overview.jsx"
import {Provider} from "react-redux"

class AppProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = store.getState();
    store.subscribe(this.updateState);
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get("/product")
      .then((data)=>{
        console.log("overview data",data.data);
        axios.get("/styles").then((styleData) => {
          console.log("Style data",styleData.data);
          var initialAction = {
            type: "initialize",
            productOverview: data.data,
            styleData: styleData.data.results
          };
          store.dispatch(initialAction)
        })
      })
  }

  updateState = () => {
    this.setState(store.getState())
  }


  render() {
    // console.log("what is state, ");
    return (
      <Provider store = {store}>
        <div class="container">
          <div class = "row">
            <div class="col-lg-7">
              <Gallery/>
            </div>

            <div class="col-lg-5">
              <PanelInfoOverview/>
              <PanelStyleSelector/>
              <PanelAddToCart/>
            </div>

          </div>
          <div class = "row">
            <Overview/>
          </div>


        </div>
      </Provider>
    )
  }

}

export default AppProductDetail