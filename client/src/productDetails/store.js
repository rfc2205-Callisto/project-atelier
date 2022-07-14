import Redux, {createStore} from "redux";

const defaultState = {
  overview: {name:'',features:[]},
  selectedStyle:{name:'default'},
  selectedStyleID: 0,
  scrollBarImgURL: [{thumbnail_url:'https://images.unsplash.com/photo-1544376664-80b17…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
style_id: 0 }],
  selectedSize: {quantity: 1}
}


const reducerFunc = function(state = defaultState, action) {
  switch (action.type) {
    case 'initialize':
      // console.log("****initialize")
      var newstate = {};
      // Info that are fixed
      newstate.overview = action.productOverview;
      newstate.styles = action.styleData;
      newstate.scrollBarImgURL = []
      for (var i = 0; i < newstate.styles.length; i++) {
        newstate.styles[i].photos[0].style_id = action.styleData[i].style_id;
        newstate.scrollBarImgURL.push(newstate.styles[i].photos[0]);

      }
      newstate.rating = 4;
      // Info upon change
      // console.log(action.styleData);
      newstate.selectedStyleID = action.styleData[0].style_id;
      newstate.selectedStyle = action.styleData[0];
      newstate.selectedStyleSizeNQuan = action.styleData[0].skus;
      newstate.selectedSize = action.styleData[0].skus[Object.keys(action.styleData[0].skus)[0]];
      newstate.photoOnDisplayURL = newstate.scrollBarImgURL[0].url
      // console.log( newstate.photoOnDisplayURL)

      return newstate
    case "changeStyle":
      var newstate = {...state}
      newstate.selectedStyleID = parseInt(action.newID);
      for (var i =0; i < state.styles.length; i++) {

        if (state.styles[i].style_id === parseInt(action.newID)) {

          newstate.selectedStyle = state.styles[i];
          newstate.selectedStyleSizeNQuan = state.styles[i].skus;
          console.log(newstate.selectedStyleSizeNQuan)
          newstate.selectedSize = state.styles[i].skus[Object.keys(state.styles[i].skus)[0]];
          newstate.photoOnDisplayURL = state.scrollBarImgURL[i].url;
          break;
        }
      }

      return newstate
    case "changeSize":
      var newstate = {...state}
      // newstate.selectedSize = action.size;

      for (var key in state.selectedStyleSizeNQuan) {

        if (state.selectedStyleSizeNQuan[key]["size"] === action.size) {
          newstate.selectedSize = state.selectedStyleSizeNQuan[key];
          break
        }
      }
      return newstate
    default:
      return state
  }
}
const store = createStore(reducerFunc);
export default store;