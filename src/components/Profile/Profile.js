import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet
    }
  }

  onFormChange = (event) => {
    switch(event.target.name) {
      case 'user-name':
        if(event.target.value === '') {
          this.setState({name: this.props.user.name});
        } else {
          this.setState({name: event.target.value});
        }
        break;
      case 'user-age':
        if(event.target.value === '') {
          this.setState({age: this.props.user.age});
        } else {
          this.setState({age: event.target.value});
        }
        break;
      case 'user-pet':
        if(event.target.value === '') {
          this.setState({pet: this.props.user.pet});
        } else {
          this.setState({pet: event.target.value});
        }
        break;
      default:
        return;
    }
  }

  onProfileUpdate = (data) => {
    fetch(`https://lit-escarpment-37081.herokuapp.com/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ formInput:data })
    }).then(resp => {
      if (resp.status === 200 || resp.status === 304){
        this.props.toggleModal();
        this.props.loadUser({ ...this.props.user, ...data });
      }
    }).catch(console.log)
  }
  
  render() {
    const { toggleModal, user } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className="profile-modal">
        <article className="pa5 br3 shadow-5 bg-white mv4 w-100 w-50-m w-25-l mw6 db" style={{position: 'relative'}}>
          <div className="db w-100">
            <div className="modal-close" onClick={toggleModal}>&times;</div>
            {/* <h1 className="center fw6">Profile</h1> */}
            <img src="https://lh3.googleusercontent.com/-F-86m_b42lE/AAAAAAAAAAI/AAAAAAAAAAA/1gpgotU7E0o/s181-c/115736155012856056412.jpg" className="db br-100 pa1 ba b--black-20 h3 w3 center" alt="avatar" />
            {/* <h5 className="db fw6 center tc">{user.name}</h5> Old Way*/}
            <h5 className="db fw6 center tc">{name}</h5>
            <h5>{`Images Entries: ${user.entries}`}</h5>
            <h5>{`Member Since: ${new Date(user.joined).toLocaleDateString("en-US")}`}</h5>
            <hr />
          </div>
          
          <div className="db">
            <label className="db w-100 mb0" htmlFor="user-name">Name:</label>
            <input className="db pa2 input-reset ba hover-bg-black hover-white w-100" type="text" name="user-name" id="name" placeholder={name} onChange={this.onFormChange} />
  
            <label className="db w-100 mt2 mb0" htmlFor="user-age">Age:</label>
            <input className="db pa2 input-reset ba hover-bg-black hover-white w-100" type="text" name="user-age" id="age" placeholder={age} onChange={this.onFormChange} />
  
            <label className="db w-100 mt2 mb0" htmlFor="user-pet">Pet:</label>
            <input className="db pa2 input-reset ba hover-bg-black hover-white w-100" type="text" name="user-pet" id="pet" placeholder={pet} onChange={this.onFormChange} />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
              <button 
                onClick={() => this.onProfileUpdate({ name, age, pet })}  
                className="pv2 ph3 white b f4 ba bg-green grow pointer mt3 mr1">Save</button>
              <button 
                onClick={toggleModal}  
                className="pv2 ph3 white b f4 ba grow bg-red pointer mt3">Cancel</button>
          </div>
        </article>
      </div>
    );
  }
  
}

export default Profile;