import React from "react";


var PhotoDetail = (props) => {
  var [pic, setPic] = React.useState(0)

  return (
    <div class="container picModal">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => { props.closeModal(false) }}>x</button>
        </div>
        <div className="pic">
          <img class="magPic" src={props.photos[pic]} onClick={()=>{setPic(pic<props.photos.length-1?pic+1:0)}}></img>
        </div>
      </div>
    </div>
  )

}

export default PhotoDetail