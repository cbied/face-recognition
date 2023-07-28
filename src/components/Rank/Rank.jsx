import React from 'react';
import Logo from '../Logo/Logo';

const Rank = () => {
    return (
        <div>
            <Logo />
            <div className="f3 b">
                {'Bied, your current rank is...'}
            </div>
            <div className="f1 pa2 b">
                {'#1'}
            </div>
            <p className="f3 b">{'This Magic Brain will detect faces in your pictures. Give it a try'}</p>
        </div>
    )
}

export default Rank;