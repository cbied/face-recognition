import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import LinkExamples from "./components/LinkExamples/LinkExamples";
import ProfileModal from "./components/Modal/Modal";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      input: "",
      boundingboxs: {},
      route: "signIn",
      userInfo: {
        id: 0,
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
      imageUrl: "",
      isSignedIn: false,
      textToCopy: "",
      modalOpen: false,
      modalSize: "md",
    };
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };
  herokuLink = "https://limitless-beach-11215-0d644074e9f3.herokuapp.com";
  localhost = "http://localhost:3001";
  handleClose = async () => {
    this.setState({ modalOpen: false });
    await fetch(`${this.herokuLink}/profile/${this.state.userInfo.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user) => {
        this.setState({ userInfo: user });
      });
  };

  findFaceBoxLocation = (data) => {
    const regionsArr = data.outputs[0].data.regions;
    let boxFaceLocationArr = [];
    const image = document.getElementById("inputImg");
    // find image width and height and to compare with percentages
    const width = +image.width;
    const height = +image.height;
    // object that holds bounding box points (percentages)
    for (let i = 0; i < regionsArr.length; i++) {
      const boxObj = regionsArr[i].region_info.bounding_box;
      boxFaceLocationArr.push({
        topRow: boxObj.top_row * height,
        bottomRow: height - boxObj.bottom_row * height,
        rightCol: width - boxObj.right_col * width,
        leftCol: boxObj.left_col * width,
      });
    }
    // return points that box faces
    return boxFaceLocationArr;
  };

  displayFaceBox = (box) => {
    this.setState({ boundingboxs: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    this.setState({ boundingboxs: {} });
  };

  onSubmit = async () => {
    await fetch(`${this.herokuLink}/imageurl`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // find location of face, plot four points for box, and draw box
        this.displayFaceBox(this.findFaceBoxLocation(result));
        // if we recieve a result for API, send put to server to update user entries
        if (result) {
          fetch(`${this.herokuLink}/image`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.userInfo.id,
              entries: this.state.userInfo.entries,
            }),
          })
            .then((response) => response.json())
            .then((userEntries) => {
              // set new userEntries state
              this.setState(
                Object.assign(this.state.userInfo, { entries: userEntries })
              );
            })
            .catch(console.log());
        }
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    this.setState({ route: "dashboard" });
    this.setState({ boundingboxs: {} });
    this.setState({ input: {} });
    this.setState({ route: route });
  };

  loadUser = (user) => {
    this.setState({
      userInfo: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };

  onCopyText(event) {
    navigator.clipboard.writeText(event.target.previousSibling.textContent);
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color="#7ca4f4" num="250" />

        <Navigation
          handleOpen={this.handleOpen}
          onRouteChange={this.onRouteChange}
          currentRoute={this.state.route}
        />

        {this.state.route === "dashboard" ? (
          <div className="interfaceDisplay">
            <div className="logoDisplay">
              {this.state.input ? (
                <FaceRecognition
                  urlImage={this.state.input}
                  boundingboxs={this.state.boundingboxs}
                />
              ) : null}
              <ProfileModal
                modalOpen={this.state.modalOpen}
                handleClose={this.handleClose}
                user={this.state.userInfo}
              />
            </div>

            <div className="formDisplay">
              <Rank newUser={this.state.userInfo} />

              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />

              <LinkExamples onCopyText={this.onCopyText} />
            </div>
          </div>
        ) : this.state.route === "signIn" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : this.state.route === "register" ? (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        ) : (
          <div>
            <h2>oops, something went wrong</h2>
          </div>
        )}
      </div>
    );
  }
}

export default App;
