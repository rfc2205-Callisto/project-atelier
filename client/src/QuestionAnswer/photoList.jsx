import React, { useState } from "react";
import axios from 'axios';

const PhotoList = (props) => {
  if (props.photos.length !== 0) {
    return (
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




