import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import privateInfo from './environment';
import './App.css';

let PAT = '';
let USER_ID = '';
let APP_ID = '';

const clarifaiRequestOptions = (imageURL) => {
  // PAT (property access token) lives in .env.local
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
      boundingboxs: {}
    }
  }

  findFaceBoxLocation = (data) => {
    const clarifaFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg');
    const width = +image.width;
    const height = +image.height;
    console.log(clarifaFace)
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
    console.log(this.state.boundingboxs)
  }


  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color='#7ca4f4' num='250'/>
        <Navigation />
        <div className='interfaceDisplay'>
          <div className='logoDisplay'>
          <FaceRecognition 
            urlImage={this.state.input}
            boundingboxs={this.state.boundingboxs}
            />
          </div>
          <div className='formDisplay'>
            <Rank />
            <ImageLinkForm 
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
