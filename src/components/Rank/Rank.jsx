import React, { Component } from 'react';
import Logo from '../Logo/Logo';

class Rank extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.newUser)
    }
    render() {
        return (
            <div>
                <Logo />
                <div className="f3 b">
                    {`${this.props.newUser.name} your current rank is...`}
                </div>
                <div className="f1 pa2 b">
                    {this.props.newUser.entries}
                </div>
                <p className="f3 b">{'This Magic Brain will detect faces in your pictures. Give it a try'}</p>
            </div>
        )
    }
    
}

export default Rank;