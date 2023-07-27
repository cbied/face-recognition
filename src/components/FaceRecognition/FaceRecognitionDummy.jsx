import React from 'react';
import placeHolderPerson from './placeholder-person.jpg'

const FaceRecognitionDummy = () => {
    return(
        <div className='center na'>
            <div className='mt2'>
                <img src={placeHolderPerson} alt="placeholder image" className='image' />
            </div>
        </div>
    )
}

export default FaceRecognitionDummy;