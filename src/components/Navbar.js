import React from 'react';
import { Link } from 'react-router-dom'

function Navbar(props) {
    return (
        <div>
            <div className="w3-top">
             <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
              <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"><i className="fa fa-bars"></i></a>
                 <Link to='/'>
                     <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4">
                        <i className="fa fa-home w3-margin-right"></i>Logo
                     </a>
                 </Link>
              <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i className="fa fa-globe"></i></a>
              <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-user"></i></a>
              <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i className="fa fa-envelope"></i></a>
              <div className="w3-dropdown-hover w3-hide-small">
                <button className="w3-button w3-padding-large" title="Notifications"><i className="fa fa-bell"></i><span className="w3-badge w3-right w3-small w3-green">3</span></button>
                <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{width:'300px'}}>
                  <a href="#" className="w3-bar-item w3-button">One new friend request</a>
                  <a href="#" className="w3-bar-item w3-button">John Doe posted on your wall</a>
                  <a href="#" className="w3-bar-item w3-button">Jane likes your post</a>
                </div>
              </div>
              <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">

              </a>
             </div>
            </div>

            <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
              <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
              <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
              <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
              <a href="#" className="w3-bar-item w3-button w3-padding-large">My Profile</a>
            </div>
        </div>
    );
}

export default Navbar;