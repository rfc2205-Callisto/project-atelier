
const defaultState={
  product_id:66633,//initial value, will be reassigned once passed in from App Component
  allQ:[],
  relatedQ:[],
};

const qaReducer=(state=defaultState,action)=>{
  switch (action.type){
    case 'AssignId':
      return{
        ...state,
        product_id:action.id
      }
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
