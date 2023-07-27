import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import FaceRecognitionDummy from './components/FaceRecognition/FaceRecognitionDummy';
import privateInfo from './environment';
import './App.css';

const clarifaiRequestOptions = (imageURL) => {
  // PAT (property access token) lives in .env.local
  const PAT = privateInfo.PAT;
  // Specify the correct user_id/app_id pairings
  const USER_ID = privateInfo.userId;       
  const APP_ID = 'face-reg';
  
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
      clarifaiOutputs: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value})
  }

  IMAGE_URL = '';
  onSubmit = () => {
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    this.IMAGE_URL = this.state.input;
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", clarifaiRequestOptions(this.IMAGE_URL))
    .then(response => response.json())
    .then(result => {
      console.log(result.outputs[0].data.regions[0].region_info.bounding_box)
      this.setState({clarifaiOutputs: result});
      this.render()
    })
    .catch(error => console.log('error', error));
  }


  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color='#7ca4f4' num='250'/>
        <Navigation />
        <div className='interfaceDisplay'>
          <div className='logoDisplay'>
            { 
            this.IMAGE_URL.includes('.jpg' || 'jpeg' || '.png' || '.pdf') ? 
            <FaceRecognition 
            urlImage={this.state.input}
            clarifaiOutputs={this.state.clarifaiOutputs}
            /> : 
            <FaceRecognitionDummy />
            }
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
