import React from 'react';

const FaceRecognition = ({ urlImage, clarifaiOutputs }) => {
    console.log(urlImage)
    console.log(clarifaiOutputs)
    return(
        <div className='center na'>
            <div className='mt2'>
                <img src={urlImage} alt="url image" className='image' />
            </div>
        </div>
    )
}

export default FaceRecognition;