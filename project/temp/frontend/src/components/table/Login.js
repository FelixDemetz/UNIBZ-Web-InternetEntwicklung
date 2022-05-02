import React from 'react';

const Login = props => (
  
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Username</th>
                <th scope="col">Description</th>
                <th scope="col">Password</th>
            </tr>
        </thead>
    <tbody>
        {
            props.users.length > 0 ? (
                props.users.map (user => (

                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.username}</td>
                        <td>{user.description}</td>
                        <td>{user.password}</td>
                        <td>
							<button 
								className="btn btn-primary"
								onClick={() => props.editRow(user)}>
								edit
							</button>

							<button 
								className="btn btn-danger"
								onClick={() => props.deleteUser(user.id)}>
								delete
							</button>
                        </td> 
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>{props.users[0]} No Users</td>
                    </tr>
                )
        }          
    </tbody>
  </table>
);
/*    const inuem = event => {
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
*/
    
export default Login;