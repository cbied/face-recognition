import React from "react";
import "./SignIn.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "user1@gmail.com",
      signInPassword: "1234",
    };
  }

  herokuLink = "https://limitless-beach-11215-0d644074e9f3.herokuapp.com";
  localhost = "http://localhost:3001";
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = async () => {
    // Post to server, sign in with email and password
    await fetch(`${this.herokuLink}/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if a user ID is found, load user state and route to dashboard
        if (data.userId) {
          this.props.loadUser(data.userId);
          this.props.onRouteChange("dashboard");
        } else {
          alert("Incorrect username or password");
        }
      });
  };

  render() {
    return (
      <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <div className="measure center flex">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  name="email-address"
                  id="email-address"
                  value={this.state.signInEmail}
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                  value={this.state.signInPassword}
                />
              </div>
            </fieldset>
            <div>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  onClick={this.onSubmitSignIn}
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  className="f6 link dim black db pointer"
                  onClick={() => this.props.onRouteChange("register")}
                >
                  Register
                </p>
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
