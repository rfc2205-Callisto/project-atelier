import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../Actions';


var Search = () => {
  const dispatch=useDispatch();
  const allQ = useSelector(state => state.allQ);
  var [entry, setEntry] = useState('');

  var handleClick=(e)=>{
    e.preventDefault();
    if(entry===''||entry===undefined){
      var relatedQ=allQ.slice();
    }else{
      var relatedQ=[];
      for(var i=0;i<allQ.length;i++){
        if(allQ[i].question_body.toLowerCase().includes(entry.toLowerCase())){
          relatedQ.push(allQ[i]);
          continue;
        }else{
          for(var j in allQ[i].answers){
            if(allQ[i].answers[j].body.toLowerCase().includes(entry.toLowerCase())){
              relatedQ.push(allQ[i]);
            }
          }
        }
      }
    }

    dispatch(allActions.qaAction.filter(relatedQ));
  }

  return (
    <div class="container">
      <form class="search">
        <input class="searchBar" value={entry} placeholder="Have a question? Search for answers…" onChange={(e) => { setEntry(e.target.value ) }}></input>
        <button class="searchButton" onClick={handleClick}>🔍</button>
      </form>
    </div>
  )
}

export default Search;