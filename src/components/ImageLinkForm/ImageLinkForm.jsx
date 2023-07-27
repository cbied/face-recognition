import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return(
        <div>
            <div>
                <div className='pa4 br3 shadow-5 ba form center'>
                    <input type="text" className='f4 pa2 w-70' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white button' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}


export default ImageLinkForm