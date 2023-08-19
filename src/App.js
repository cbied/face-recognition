import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import privateInfo from './environment';
import './App.css';

let PAT = '';
let USER_ID = '';
let APP_ID = '';

const clarifaiRequestOptions = (imageURL) => {
  // PAT (property access token) lives in environment.js
  PAT = privateInfo.PAT;
  // Specify the correct user_id/app_id pairings
  USER_ID = privateInfo.userId;       
  APP_ID = 'face-reg';
  // update IMAGE_URL to image input
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      input: '',
      boundingboxs: {},
      route: 'signIn',
      userInfo: {
        id: 0,
        name: '',
        email: '',
        entries: 0,
        joined: ''
    },
      imageUrl: '',
      isSignedIn: false
    }
  }


  findFaceBoxLocation = (data) => {
    const clarifaFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg');
    const width = +image.width;
    const height = +image.height;
    return {
      topRow: clarifaFace.top_row * height,
      bottomRow: height - (clarifaFace.bottom_row * height),
      rightCol: width - (clarifaFace.right_col * width),
      leftCol: clarifaFace.left_col * width
    }
  }

  displayFaceBox = (box) => {
    this.setState({boundingboxs: box})    
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value})
  }

  
  onSubmit = () => {
    // Change to model and image URL you want to use
    const MODEL_ID = 'face-detection';
    this.IMAGE_URL = this.state.input;
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", clarifaiRequestOptions(this.IMAGE_URL))
    .then(response => response.json())
    .then(result => this.displayFaceBox(this.findFaceBoxLocation(result)))
    .catch(error => console.log('error', error));
  }

  showSignOut;
  onRouteChange = (route) => {
    this.setState({ route: route})
    if (route === 'dashboard') {
      this.showSignOut = true
    } else {
      this.showSignOut = false
    }
  }

  loadUser = (user) => {
    console.log(user)
    this.setState({
        userInfo: {
          id: user.id,
          name: user.name,
          email: user.email,
          entries: user.entries,
          joined: user.joined,
        }
      })
      this.setRank(user.name, user.entries)
  }

  newUser;
  setRank = (userName, userEntries) => {
    const userRank = {
      name: userName,
      entries: userEntries
    }

    this.newUser = userRank
  }


  render() {
    return (
      <div className="App">
        <ParticlesBg 
        type="cobweb" 
        bg={true} 
        color='#7ca4f4' 
        num='250'
        />
        <Navigation 
        onRouteChange={this.onRouteChange} 
        showSignOut={this.showSignOut}
        />
        
        {
          this.state.route === 'signIn' ?
          <SignIn 
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          />

          : this.state.route === 'dashboard' ?

          <div className='interfaceDisplay'>
            <div className='logoDisplay'>
            <FaceRecognition 
              urlImage={this.state.input}
              boundingboxs={this.state.boundingboxs}
              />
            </div>
            <div className='formDisplay'>
              {this.newUser ? 
              <Rank 
              newUser={this.newUser}
              /> : 
              null}
              <ImageLinkForm 
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              />
            </div>
         </div>

         : this.state.route === 'register' ?
         <Register 
         onRouteChange={this.onRouteChange}
         loadUser={this.loadUser}
         />

         :
         
         <div><h2>oops, something went wrong</h2></div>
        }
          
          
          
    
        
        
      </div>
    );
  }
}

export default App;
