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
    // object that holds bounding box points (percentages)
    const clarifaFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg');
    // find image width and height and to compare with percentages
    const width = +image.width;
    const height = +image.height;
    // return points that box face
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

  
  onSubmit = async () => {
    // model for face detection API
    const MODEL_ID = 'face-detection';
    // current image user is using
    this.IMAGE_URL = this.state.input;
    // fetch carifai API to get bounding boxes for face
    await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", clarifaiRequestOptions(this.IMAGE_URL))
    .then(response => response.json())
    .then(result => {
      // find location of face, plot four points for box, and draw box
      this.displayFaceBox(this.findFaceBoxLocation(result))
      // if we recieve a result for API, send put to server to update user entries
      if (result) {
        fetch('http://localhost:3001/image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.userInfo.id,
                entries: this.state.userInfo.entries
            })
        })
        .then(response => response.json())
        .then(userEntries => {
          // set new userEntries state
          this.setState(Object.assign(this.state.userInfo, { entries: userEntries}))
        })
      }
    })
    .catch(error => console.log('error', error));
  }

  showSignOut;
  onRouteChange = (route) => {
    this.setState({ route: route })
    if (route === 'dashboard') {
      this.showSignOut = true
    } else {
      this.showSignOut = false
    }
  }

  loadUser = (user) => {
    this.setState({
        userInfo: {
          id: user.id,
          name: user.name,
          email: user.email,
          entries: user.entries,
          joined: user.joined,
        }
      })
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
              {this.state.input ? 
              <FaceRecognition 
              urlImage={this.state.input}
              boundingboxs={this.state.boundingboxs}
              />
              :
              null
            }
            </div>
            <div className='formDisplay'>
              {this.state.userInfo.id ? 
              <Rank 
              newUser={this.state.userInfo}
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
