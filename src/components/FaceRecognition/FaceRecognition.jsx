import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ urlImage, boundingboxs }) => {
    return(
        <div className='center na'>
            <div className='mt2 faceContainer'>
                <img src={urlImage} 
                    alt="" 
                    className='image' 
                    id='inputImg'
                    />
                <div className="bounding-box"
                    style={{
                        'top': boundingboxs.topRow,
                        'bottom': boundingboxs.bottomRow,
                        'right': boundingboxs.rightCol,
                        'left': boundingboxs.leftCol
                    }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;