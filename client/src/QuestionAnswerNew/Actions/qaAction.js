const initialize=(allQ)=>{
  return {
    type:"Initialize",
    allQ
  };
};
const filter=(relatedQ)=>{
  return{
    type:'Filter',
    relatedQ
  }
}
export default {
  initialize,
  filter
}