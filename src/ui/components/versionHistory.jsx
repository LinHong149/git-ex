import React from 'react'
import "./App.css"
// import logo from './logo.png';

function versionHistory() {
  return (
    <div className="container">
        <img></img>
        <div className="textContainer">
            <p>Version 1</p>
            <p>2 days ago</p>
        </div>
        <sp-picker-button quiet></sp-picker-button>
    </div>
  )
}

export default versionHistory