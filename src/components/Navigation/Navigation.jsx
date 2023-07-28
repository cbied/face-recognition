import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = () => {
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <p className='f3 link dim black underline pa1 pointer'>Sign Out</p>
        </nav>
    )
}

export default Navigation;