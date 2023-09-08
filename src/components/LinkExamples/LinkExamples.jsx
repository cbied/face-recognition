import React from 'react';
import './LinkExamples.css'

// add "copy link" buttons
const LinkExamples = ({onCopyText}) => {
    return(
        <div>
            <h2>Example links below</h2>
            <div className='copyLinks'>
                <p className='links'>https://static-bebeautiful-in.unileverservices.com/Flawless-skin-basics.jpg</p>
                <button className='w-15 f6 ph3 pv1 ma2 white button' onClick={onCopyText}>Copy to Clipboard</button>
            </div>
            <div className='copyLinks'>
                <p className='links'>https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/09/GettyImages-1132551603_header-1024x575.jpg?w=1155&h=1528</p>
                <button className='w-15 f6 ph3 pv1 ma2 white button' onClick={onCopyText}>Copy to Clipboard</button>
            </div>
            <div className='copyLinks'>
                <p className='links'>https://media.istockphoto.com/id/1069713934/photo/perfection-in-profile.jpg?s=1024x1024&w=is&k=20&c=MZgTvWg4V4eDgJT5iquxGWC7UgYJetteabrZKncgpJA=</p>
                <button className='w-15 f6 ph3 pv1 ma2 white button' onClick={onCopyText}>Copy to Clipboard</button>
            </div>
            <div className='copyLinks'>
                <p className='links'>https://www.urban.org/sites/default/files/gettyimages-1209890204_crop.jpg</p>
                <button className='w-15 f6 ph3 pv1 ma2 white button' onClick={onCopyText}>Copy to Clipboard</button>
            </div>
        </div>
    )
}


export default LinkExamples