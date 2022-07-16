import {createStore} from 'redux';

const defaultState={
  product_id:66664,
  allQ:[],
  relatedQ:[],
};

const qaReducer=(state=defaultState,action)=>{
  switch (action.type){
    case 'Initialize':
      return {
        ...state,
        allQ:action.allQ,
        relatedQ:action.allQ,
      }
    case 'Filter':
      return{
        ...state,
        relatedQ:action.relatedQ,

      }
    default:
      return state;
  }
}

export default qaReducer;
