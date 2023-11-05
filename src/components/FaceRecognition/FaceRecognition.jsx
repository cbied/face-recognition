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
                    {boundingboxs.length ? 
                        boundingboxs.map((boxItems,i) => {
                            return(
                                <div className="bounding-box"
                                    key={i}
                                    style={{
                                        'top': boxItems.topRow,
                                        'bottom': boxItems.bottomRow,
                                        'right': boxItems.rightCol,
                                        'left': boxItems.leftCol
                                    }}></div>
                                    )
                                })
                                : 
                            null
                    }
            </div>
        </div>
    )
}

export default FaceRecognition;