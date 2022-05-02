import React from 'react';
import "../../style.css";

const Login = props => {
  
    const checksUsernameAndPassword = event => {
        var s1 = document.getElementById("username").value;
        var s2 = document.getElementById("password").value;

        if(s1 === s2){
            document.getElementById("userSpan").innerHTML = s1
        }
        else{
            document.getElementById("userSpan").innerHTML = "Wrong Username or Password"
        }
    }

    return (
        
    <div className="row" id="singlePageSection">
        <h2>Login</h2>
        <span class="form-label" >Logged in as: <span class="form-label-user" id="userSpan"></span></span>
        <form id="loginLabels" className="col 6">
            <div class="mb-3 col-6">
                <label class="form-label" htmlFor="bo">Username</label>
                <input type="text" class="form-control" id="username" name="username"/>
                <label class="form-label" htmlFor="bo">Password</label>
                <input type="password" class="form-control" id="password" name="password" />
            </div>
            <div class="col-6">
                <input class="btn" type="button" value="Login" onClick={checksUsernameAndPassword}></input>
                <button class="btn">Create new</button>
            </div>
        </form>
    </div>
    )

}
    
export default Login;