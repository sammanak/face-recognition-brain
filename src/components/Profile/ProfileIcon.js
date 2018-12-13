import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ProfileIcon extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <div className="pa4 tc">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img src="http://tachyons.io/img/logo.jpg" className="br-100 pa1 ba b--white-70 h3 w3 shadow-5 pointer" alt="avatar" />
          </DropdownToggle>
          <DropdownMenu right className="mt3 shadow-5">
            <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
            {/* <DropdownItem divider /> */}
            <DropdownItem onClick={ () => this.props.onRouteChange('signout') }>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
      </div>
    );
  }
}

export default ProfileIcon;