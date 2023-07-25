import React from 'react';

const FaceRecognition = ({ urlImage, clarifaiOutputs }) => {
    console.log(urlImage)
    console.log(clarifaiOutputs)
    return(
        <div className='center na'>
            <div className='absolute mt2'>
                <img src={urlImage} alt="url image" width="500px" height="auto" />
            </div>
        </div>
    )
}

export default FaceRecognition;