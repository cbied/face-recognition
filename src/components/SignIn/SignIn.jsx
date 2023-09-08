import React from 'react';
import './SignIn.css';


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = async () => {
        // Post to server, sign in with email and password
        await fetch('http://localhost:3001/signIn', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(user => {
            // if a user ID is found, load user state and route to dashboard
            if(user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('dashboard')
            } else {
                alert('Incorrect username or password')
            }
        })
    }


    render() {
        return (
            <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <div className="measure center flex">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6">Email</label>
                            <input onChange={this.onEmailChange} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  
                            name="email-address"  
                            id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6">Password</label>
                            <input onChange={this.onPasswordChange}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" />
                        </div>
                        </fieldset>
                        <div>
                            <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            onClick={this.onSubmitSignIn}
                            type="submit" 
                            value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer"
                            onClick={() => this.props.onRouteChange('register')
                        }>Register</p>
                            </div>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
    
}

export default SignIn;