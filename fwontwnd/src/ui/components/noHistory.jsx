import React from 'react'
import "./noHistory.css";
import version_image from "./images/versions_image.jpg";

function noHistory() {
  return (
    <div className="mainContainer">
        <img src={version_image}></img>
        <div className="mainText">
            <p>Your Adobe Express design versions will appear here</p>
        </div>
        <div className="subText">
            <p>Click <u>Push Changes</u> to start saving named versions of your design!</p>
        </div>
    </div>
  )
}

export default noHistory