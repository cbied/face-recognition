import React from 'react';
import Tilt from 'react-parallax-tilt';
import faceLogo from './face-detection.png'
import './Logo.css'


const Logo = () => {
    return(
        <div className='ma4 mt0 container'>
            <Tilt className='tilt'>
            <div className='br2 shadow-2 pa3'>
                <img src={faceLogo} alt="face detection logo"/>
            </div>
            </Tilt>
        </div>
    )
}

export default Logo;