import React from 'react';
import './SignIn.css'

const SignIn = ({ onRouteChange }) => {
    return (
        <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <div className="measure center flex">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        onClick={() => onRouteChange('dashboard')}
                        type="submit" 
                        value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p className="f6 link dim black db pointer"
                        onClick={() => onRouteChange('register')}>Register</p>
                        </div>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default SignIn;