import React, { useState } from 'react';
import axios from 'axios';

import PhotoDetail from './photoDetail.js';

var PhotoList = (props) => {
  var [openModal,setOpenModal]=useState(false);

  if (props.photos.length !== 0) {
    return (
      <>
        {openModal&&<PhotoDetail photos={props.photos} closeModal={setOpenModal}/>}
        <div className="photo">{
          props.photos.map((photo) => {
            return (<img src={photo} onClick={()=>{setOpenModal(true)}}></img>)
          })
        }</div>
      </>
    )
  }else{
    return <></>
  }
}

export default PhotoList;




