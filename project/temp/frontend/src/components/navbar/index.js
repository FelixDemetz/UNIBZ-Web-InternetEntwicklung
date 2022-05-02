import React from 'react';
import "../../style.css"


const NavBar = () => (
	
	<nav class="navbar navbar-expand-lg nav">
  	<div class="container-fluid" id="myTopnav">
    <a class="navbar-brand1" href="#">FreeCon</a>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link" aria-current="page" href="#">Feed</a>
        <a class="nav-link" href="#">Discover</a>
        <a class="nav-link" href="#">Chat</a>
      </div>
    </div>
  </div>
</nav>
);

export default NavBar;