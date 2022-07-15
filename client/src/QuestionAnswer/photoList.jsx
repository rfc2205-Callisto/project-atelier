import React, { useState } from "react";
import axios from 'axios';


const PhotoList = (props) => {

  return (


    (<div className="photo">{
      props.photos.map((photo) => {
        return (<img src={photo}></img>)
      })
    }</div>)


  )
}

export default PhotoList;




