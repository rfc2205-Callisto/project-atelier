import React, { useState } from "react";
import axios from 'axios';

import PhotoDetail from './photoDetail.jsx';

const PhotoList = (props) => {
  var [openModal,setOpenModal]=useState(false);

  if (props.photos.length !== 0) {
    return (
      {openModal&&<PhotoDetail/>}
      <div className="photo">{
        props.photos.map((photo) => {
          return (<img src={photo}></img>)
        })
      }</div>
    )
  }else{
    return <></>
  }
}

export default PhotoList;




