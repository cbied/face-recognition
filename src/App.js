import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import LinkExamples from './components/LinkExamples/LinkExamples';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      input: '',
      boundingboxs: {},
      route: localStorage.getItem("id") ? 'dashboard' : 'signIn',
      userInfo: {
        id: localStorage.getItem("id") ? localStorage.getItem("id") : 0,
        name: localStorage.getItem("name") ? localStorage.getItem("name") : '' ,
        email: localStorage.getItem("email") ? localStorage.getItem("email") : '',
        entries: localStorage.getItem("entries") ? localStorage.getItem("entries") : 0,
        joined: localStorage.getItem("joined") ? localStorage.getItem("joined") : ''
    },
      imageUrl: '',
      isSignedIn: false,
      textToCopy: ''
    }
    
  }

  herokuLink = 'https://limitless-beach-11215-0d644074e9f3.herokuapp.com'
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
    this.setState({ boundingboxs: {}})
  }

  
  onSubmit = async () => {
    await fetch(`${this.herokuLink}/imageurl`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
  })
  .then(response => response.json())
    .then(result => {
      // find location of face, plot four points for box, and draw box
      this.displayFaceBox(this.findFaceBoxLocation(result))
      // if we recieve a result for API, send put to server to update user entries
      if (result) {
        fetch(`${this.herokuLink}/image`, {
            method: 'PUT',
            mode: 'no-cors',
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
          localStorage.setItem('entries', userEntries)
        })
        .catch(console.log())
      }
    })
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (localStorage.getItem("id") && route !== 'signIn') {
      this.setState({ route: 'dashboard' })
    } else {
      localStorage.clear();
      this.setState({ boundingboxs: {}})
      this.setState({ input: {}})
      this.setState({ route: route })
    }
  }

  loadUser = (user) => {
    localStorage.setItem('id', user.id)
    localStorage.setItem('name', user.name)
    localStorage.setItem('email', user.email)
    localStorage.setItem('entries', user.entries)
    localStorage.setItem('joined', user.joined)

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

  onCopyText(event) {
    navigator.clipboard.writeText(event.target.previousSibling.textContent)
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
        currentRoute={this.state.route}
        />
        
        {

          

        this.state.route === 'dashboard' && localStorage.getItem("id") ?

        <div className='interfaceDisplay'>
            <div className='logoDisplay'>

            {

            this.state.input ? 
            <FaceRecognition 
            urlImage={this.state.input}
            boundingboxs={this.state.boundingboxs}
            />
            :
            null

            }

            </div>

            <div className='formDisplay'>

              {

              this.state.userInfo.id ? 
              <Rank 
              newUser={this.state.userInfo}
              /> : 
              null
              
              }

              <ImageLinkForm 
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              />

              <LinkExamples
              onCopyText={this.onCopyText}
              />

            </div>
         </div>

          : 

          this.state.route === 'signIn' && !localStorage.getItem("id") ?

          <SignIn 
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          />

          : 
          
          this.state.route === 'register' && !localStorage.getItem("id") ?

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
