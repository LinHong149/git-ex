import React from 'react'
import "./App.css"
import { Button } from '@swc-react/button'
import goose from './images/goose2.png';
import eye from './images/eye.png';
import { Divider } from '@spectrum-web-components/divider';


function versionHistory({title}) {
  

  return (
    <div className="abc">
      <div className="versionsContainer">
        <div className="imageTextContainer">
          <img className="versionImages" src={goose}></img>
          <div className ="versionsParentContainer">       
            <p className="versionText">{title}</p>
            <p className="versionText">2 seconds ago</p>
          </div>        
        </div>
        <img className="versionImagesEye"src={eye}></img>
      </div>

      <sp-divider size="m"></sp-divider>
    </div>
    
    
  )
}

export default versionHistory