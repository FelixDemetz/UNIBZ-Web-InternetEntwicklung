import React from 'react';
import "../../style.css";

const NavBar = () => (
	
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
  		<div class="container-fluid">
    		<a class="navbar-brand" href="#">FreeCon</a>
	    </div>
		<div>
			<a id="nav1" class="nav1" href="#1" onclick="myFunction()">Our idea</a>
                <a id="nav2" class="nav2" href="#2" onclick="myFunction()">Team</a>
                <a id="nav3" class="nav3" href="#3" onclick="myFunction()">Values</a>
                <a id="nav4" class="nav4" href="#4" onclick="myFunction()">We are here</a>
		</div>
	</nav>
);

export default NavBar;