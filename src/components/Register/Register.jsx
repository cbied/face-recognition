import React from 'react';

const Register = ({ onRouteChange }) => {
    return (
        <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <div className="measure center flex">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="new-name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="new-email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="new-password" />
                    </div>
                    </fieldset>
                    <div>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        onClick={() => onRouteChange('dashboard')}
                        type="submit" 
                        value="Register"/>
                        </div>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default Register;