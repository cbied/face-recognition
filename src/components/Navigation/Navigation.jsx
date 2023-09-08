import React from 'react';

const Navigation = ({ onRouteChange, showSignOut, currentRoute }) => {
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            {
                currentRoute !== 'signIn' ? 
                <p className='f3 link dim black underline pa1 pointer'
                onClick={() => onRouteChange('signIn')}>Sign Out</p>
                :
                    <p></p>         
            }
        </nav>
    )
}

export default Navigation;