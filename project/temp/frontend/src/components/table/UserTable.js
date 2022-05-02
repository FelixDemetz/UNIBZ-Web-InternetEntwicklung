import React from 'react';

const UserTable = props => (
  
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
								class="btn"
								onClick={() => props.editRow(user)}>
								edit
							</button>
                            </td>
                            <td>
							<button 
								class="btn"
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
    
export default UserTable;