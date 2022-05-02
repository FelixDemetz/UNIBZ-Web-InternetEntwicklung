import React from 'react';

const Login = props => {
  
    const inuem = event => {
        var s1 = document.getElementById("username").value;
        var s2 = document.getElementById("password").value;

        if(s1 === s2){
            document.getElementById("hitla").innerHTML = "dingdou"
        }
        else{
            document.getElementById("hitla").innerHTML = "padabedippidi"
        }
    }

    return (
        
    <div className="row">
        <h2>Diocane</h2>
        <span id="hitla">User: </span>
        <form className="col s12">
            <div class="mb-3 col-12">
                <label class="form-label" htmlFor="bo">Username</label>
                <input type="text" class="form-control" id="username" name="username"/>
                <label class="form-label" htmlFor="bo">Password</label>
                <input type="text" class="form-control" id="password" name="password" />
            </div>
            <div class="col-12">
                <input type="button" value="Login" onClick={inuem}></input>
            </div>
        </form>
    </div>
    )

};

    
export default Login;