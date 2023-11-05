import React from 'react';
import './LinkExamples.css'

// add "copy link" buttons
const LinkExamples = ({onCopyText}) => {
    return(
        <div>
            <h2>Example links below</h2>
            <div className='copyLinks'>
                <p>One face</p>
                <p className='links'>https://static-bebeautiful-in.unileverservices.com/Flawless-skin-basics.jpg</p>
                <button className='w-15 f6 ph3 pv1 ma2 white button' onClick={onCopyText}>Copy to Clipboard</button>
            </div>
            <div className='copyLinks'>
                <p>Multiple faces</p>
                <p className='links'>https://bigthink.com/wp-content/uploads/2022/08/AdobeStock_502229899.jpeg</p>
                <button className='w-15 f6 ph3 pv1 ma2 white button' onClick={onCopyText}>Copy to Clipboard</button>
            </div>
            <div className='copyLinks'>
                <p>One face</p>
                <p className='links'>https://media.istockphoto.com/id/1069713934/photo/perfection-in-profile.jpg?s=1024x1024&w=is&k=20&c=MZgTvWg4V4eDgJT5iquxGWC7UgYJetteabrZKncgpJA=</p>
                <button className='w-15 f6 ph3 pv1 ma2 white button' onClick={onCopyText}>Copy to Clipboard</button>
            </div>
            <div className='copyLinks'>
                <p>Multiple faces</p>
                <p className='links'>https://www.investorsinpeople.com/wp-content/uploads/2022/04/shutterstock_236097745.jpg</p>
                <button className='w-15 f6 ph3 pv1 ma2 white button' onClick={onCopyText}>Copy to Clipboard</button>
            </div>
        </div>
    )
}


export default LinkExamples