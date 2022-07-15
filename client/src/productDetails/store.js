import Redux, {createStore} from "redux";

const defaultState = {
  overview: {name:'',features:[]},
  fullView: false,
  selectedStyle:{name:'default'},
  selectedStyleID: 0,
  selectedImgStyleID: 0,
  scrollBarImgURL: [{thumbnail_url:'https://images.unsplash.com/photo-1544376664-80b17…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
style_id: 0 }],
scrollBarImgURLpartial: [{thumbnail_url:'https://images.unsplash.com/photo-1544376664-80b17…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
style_id: 0 }],
  selectedSize: {quantity: 1}
}

const reducerFunc = function(state = defaultState, action) {
  switch (action.type) {
    case 'initialize':
      // console.log("****initialize")
      var newstate = {};
      newstate.interval = 5;
      // Info that are fixed
      newstate.overview = action.productOverview;
      newstate.styles = action.styleData;
      newstate.scrollBarImgURL = []
      for (var i = 0; i < newstate.styles.length; i++) {
        newstate.styles[i].photos[0].style_id = action.styleData[i].style_id;
        newstate.scrollBarImgURL.push(newstate.styles[i].photos[0]);

      }
      newstate.rating = 4;
      newstate.maxStyleID = action.styleData[action.styleData.length-1].style_id;
      newstate.minStyleID = action.styleData[0].style_id;
      newstate.scrollmin = action.styleData[0].style_id;
      newstate.scrollmax = Math.min(newstate.scrollmin + newstate.interval, newstate.maxStyleID);
      newstate.scrollBarImgURLpartial=[];
      var i = 0;
      for (var id = newstate.scrollmin; id <= newstate.scrollmax; id++) {

        if (newstate.scrollBarImgURL[i]["style_id"] === id) {
          newstate.scrollBarImgURLpartial.push(newstate.scrollBarImgURL[i]);
        }
        i++

      }
      newstate.fullView = false;


      // Info upon change
      // console.log(action.styleData);
      newstate.selectedStyleID = action.styleData[0].style_id;
      newstate.selectedStyle = action.styleData[0];
      newstate.selectedStyleSizeNQuan = action.styleData[0].skus;
      newstate.selectedSize = action.styleData[0].skus[Object.keys(action.styleData[0].skus)[0]];
      newstate.photoOnDisplayURL = newstate.scrollBarImgURL[0].url
      newstate.selectedImgStyleID = action.styleData[0].style_id;
      // console.log("*****scrollBarImg: ", newstate.scrollBarImgURL)
      return newstate

    case "changeStyle":
      var newstate = {...state}
      newstate.selectedStyleID = parseInt(action.newID);
      newstate.selectedImgStyleID = parseInt(action.newID);
      for (var i =0; i < state.styles.length; i++) {

        if (state.styles[i].style_id === parseInt(action.newID)) {

          newstate.selectedStyle = state.styles[i];
          newstate.selectedStyleSizeNQuan = state.styles[i].skus;
          // console.log(newstate.selectedStyleSizeNQuan)
          newstate.selectedSize = state.styles[i].skus[Object.keys(state.styles[i].skus)[0]];
          newstate.photoOnDisplayURL = state.scrollBarImgURL[i].url;

          break;
        }
      }

      return newstate
    case "changeSize":
      var newstate = {...state}

      for (var key in state.selectedStyleSizeNQuan) {
        if (state.selectedStyleSizeNQuan[key]["size"] === action.size) {
          newstate.selectedSize = state.selectedStyleSizeNQuan[key];
          break
        }
      }
      return newstate

    case "changeImage":
      var newstate = {...state}
      newstate.selectedImgStyleID = parseInt(action.styleID);
      for (var i =0; i < state.styles.length; i++) {
        if (state.styles[i].style_id === parseInt(action.styleID)) {
          newstate.photoOnDisplayURL = state.scrollBarImgURL[i].url;
          break;
        }
      }
      return newstate;
    case "nextImage":
      var newstate = {...state}
      if (parseInt(action.currID)+1 > newstate.maxStyleID) {
        newstate.selectedImgStyleID =  newstate.selectedImgStyleID
      } else {
        newstate.selectedImgStyleID = action.currID + 1
      }
      for (var i =0; i < state.styles.length; i++) {
        if (state.styles[i].style_id === parseInt(newstate.selectedImgStyleID)) {
          newstate.photoOnDisplayURL = state.scrollBarImgURL[i].url;
          break;
        }
      }
      return newstate;
    case "prevImage":
        var newstate = {...state}
        if (parseInt(action.currID)-1 < newstate.minStyleID) {
          newstate.selectedImgStyleID = newstate.selectedImgStyleID
        } else {
          newstate.selectedImgStyleID = action.currID - 1
        }
        for (var i =0; i < state.styles.length; i++) {
          if (state.styles[i].style_id === parseInt(newstate.selectedImgStyleID)) {
            newstate.photoOnDisplayURL = state.scrollBarImgURL[i].url;
            break;
          }
        }
        return newstate;

    case "scrollUp":
      var newstate = {...state}
      if (newstate.scrollmin - 1 >= newstate.minStyleID) {
        newstate.scrollmax -= 1
        newstate.scrollmin -= 1
        var i = 0;
        newstate.scrollBarImgURLpartial=[];
        var id = newstate.scrollmin;

        for (var i = 0; i < newstate.scrollBarImgURL.length; i++) {
          if (newstate.scrollBarImgURL[i]["style_id"] === id && id <= newstate.scrollmax) {
            id ++;
            newstate.scrollBarImgURLpartial.push(newstate.scrollBarImgURL[i]);
          }
        }}


      return newstate;
    case "scrollDown":
      var newstate = {...state}

      if (newstate.scrollmax + 1 <= newstate.maxStyleID) {
        newstate.scrollmax += 1
        newstate.scrollmin += 1
        var i = 0;
        newstate.scrollBarImgURLpartial=[];
        var id = newstate.scrollmin;

        for (var i = 0; i < newstate.scrollBarImgURL.length; i++) {
          if (newstate.scrollBarImgURL[i]["style_id"] === id && id <= newstate.scrollmax) {
            id ++;
            newstate.scrollBarImgURLpartial.push(newstate.scrollBarImgURL[i]);
          }
        }}

      return newstate;
    case "updateRange":
      var newstate = {...state}
      var diff1 = action.currID - newstate.scrollmax
      var diff2 = newstate.scrollmin -  action.currID
      if (diff1 > 0) {
        newstate.scrollmin += diff1
        newstate.scrollmax += diff1
      } else {

        newstate.scrollmin -= diff2
        newstate.scrollmax = newstate.scrollmin + newstate.interval
      }
      var i = 0;
      newstate.scrollBarImgURLpartial=[];
      var id = newstate.scrollmin;

      for (var i = 0; i < newstate.scrollBarImgURL.length; i++) {
        if (newstate.scrollBarImgURL[i]["style_id"] === id && id <= newstate.scrollmax) {
          id ++;
          newstate.scrollBarImgURLpartial.push(newstate.scrollBarImgURL[i]);
        }
      }
      return newstate
    case "enterFullView":
      var newstate = {...state}
      newstate.fullView = !state.fullView;
      return newstate
    default:
      return state
  }
}
const store = createStore(reducerFunc);
export default store;