import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRegonition from './components/FaceRegonition/FaceRegonition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initailState = {
	input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
  	id: '',
		name: '',
		email: '',
		entries: 0,
    age: 0,
    pet: '',
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initailState;
  }

  loadUser = (data) => {
  	this.setState({
	  	user: { 
	  		id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				age: data.age,
				pet: data.pet,
				joined: data.joined
	  	}
  	})
  }

  componentDidMount() { 
  	// fetch(process.env.SERVER_URL)
    // .then(res => res.json())
    // .then(console.log)
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${process.env.SERVER_URL}/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            // console.log('success we need to get user profile');
            fetch(`${process.env.SERVER_URL}/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
              .then(resp => resp.json())
              .then(user => {
                // console.log(user)
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange('home');
                }
              })
          }
        })
        .catch(console.log)
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout' ) {
      window.sessionStorage.clear();
      return this.setState(initailState);
    } else if ( route === 'signin' ) {
      return this.setState(initailState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !this.state.isProfileOpen
    }))
  }

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      // console.log(width, height);
      // console.log(face);
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height),
          faceId: face.id
        }
      })
    }
    return;
  }

  displayFaceBox = (boxes) => {
    if (boxes) {
      this.setState({ boxes: boxes });
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(`${process.env.SERVER_URL}/imageurl`, {
			method: 'post',
			headers: { 
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
			body: JSON.stringify({
				input: this.state.input
			})
		})
		.then(response => response.json())
    .then(response => {
    	if (response) {
    		fetch(`${process.env.SERVER_URL}/image`, {
    			method: 'put',
    			headers: { 
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
          },
    			body: JSON.stringify({
    				id: this.state.user.id
    			})
    		})
    			.then(res => res.json())
    			.then(count => {
    				// this.setState({user: {
    				// 	entries: count
    				// }})
    				this.setState(Object.assign(this.state.user, {entries: count}))
    			})
    	} 
    	this.displayFaceBox(this.calculateFaceLocations(response))
    })
    .catch(error => console.log(error))
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes, isProfileOpen, user } = this.state;
    const { name, entries } = this.state.user;
    return (
      <div className="App">
        <Particles 
          className='particles' 
          params={particlesOptions} 
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal} />
        { isProfileOpen &&
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
          </Modal>
        }
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={name} entries={entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRegonition boxes={boxes} imageUrl={imageUrl} />
            </div>
          : (
          	route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
