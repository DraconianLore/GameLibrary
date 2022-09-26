import React from 'react'
import { scaleRotate as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'

class SideMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
    window.location.replace(window.location.protocol + "//" + window.location.host + '/settings')
  }

  render () {
    return (
      <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <Link id="home" className="menu-item" to="/app">My Games</Link>
        <Link id="friends" className="menu-item" to="/friends">My Friends</Link>
        <Link id="wishlist" className="menu-item" to="/wishlist">Wishlist</Link>
        <Link id="settings" className="menu-item" to='#' onClick={this.showSettings}>Settings</Link>
      </Menu>
    );
  }
}

export default SideMenu;
