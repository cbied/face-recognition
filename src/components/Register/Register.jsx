import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      user: {
        id: 0,
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  herokuLink = "https://limitless-beach-11215-0d644074e9f3.herokuapp.com";
  localhost = "http://localhost:3001";

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  updateUserState = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };

  onRegistration = async () => {
    // POST to server name, email, password/hash
    await fetch(`${this.herokuLink}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        // if responses with user, load user state and change route to dashboard
        if (user.id) {
          this.updateUserState(user);
          this.props.loadUser(user);
          this.props.onRouteChange("dashboard");
        } else {
          alert("Registration Failed, please try again");
        }
      });
  };

  render() {
    return (
      <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <div className="measure center flex">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Name</label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="new-name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Email</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="new-email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Password</label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="new-password"
                />
              </div>
            </fieldset>
            <div>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  onClick={this.onRegistration}
                  type="submit"
                  value="Register"
                />
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
