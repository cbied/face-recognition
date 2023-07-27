import React from 'react';
import Tilt from 'react-parallax-tilt';
import faceLogo from './face-detection.png'
import './Logo.css'


const Logo = () => {
    return(
        <div className='ma4  container'>
            <Tilt className='tilt'>
            <div className='shadow-2 br2 pa3'>
                <img src={faceLogo} alt="face detection logo"/>
            </div>
            </Tilt>
        </div>
    )
}

export default Logo;