import React, { Component } from 'react';
import qs from 'querystring';

import api from '../services/api';

import UserTable from '../components/table/UserTable';
import AddUserForm from '../components/forms/AddUserForm';
import EditUserForm from '../components/forms/EditUserForm';
import Login from '../components/table/Login';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            currentUser: { id: null, name: '', surname: '', username: '', password:'', description: ''},
            editing: false
        }
    }

    componentDidMount() {
        this.refreshUserTable();
    }

    refreshUserTable() {
        this.usersData = api.get('api')
            .then(response => response.data)
            .then(data => {
                this.setState({ 
                    users: data.data,
                    setUsers: data.data
                });
            });
    }

    addUser = user => {
        api.post('api', qs.stringify(user))
            .then(res => {
                this.refreshUserTable();
            });
    };

    deleteUser = id => {
        api.delete(`api/${id}`)
            .then(res => {
                this.refreshUserTable();
            });
    };

    updateUser = (id, user) => {
        api.put(`api/${id}`, qs.stringify(user))
            .then(res => {
                this.refreshUserTable();
            });
        
        this.setState({ 
            currentUser: { id: null, name: '', surname: '', username: '', password:'', description: ''}
        });

        this.setEditing(false);
    };

    editRow = user => {
        this.setState({ 
            currentUser: { id: user.id, name: user.name, surname: user.surname, username: user.username, password: user.password, description: user.description}
        });

        this.setEditing(true);
    };

    setEditing = isEditing => {
        this.setState({ editing: isEditing });
    };

    render () {
        const { users } = this.state;

        return (
            <div className="container mt-5">
                <div className="row"> 
                    <Login />  
                    {
                        
                        this.state.editing ? (
                            <div className="col-6">
                                <h4>Edit User</h4>
                                <EditUserForm 
                                    editing={this.state.editing}
                                    setEditing={this.setEditing}
                                    currentUser={this.state.currentUser}
                                    updateUser={this.updateUser} 
                                />
                            </div>
                        ) : (
                            <div className="col-6">
                                <h2>Create your FreeCon</h2>
                                <AddUserForm addUser={this.addUser} />
                            </div>
                        )
                    }
                    <div className="col-6">
                        <h4>Users</h4>
                        <UserTable users={users} editRow={this.editRow} deleteUser={this.deleteUser} />
                    </div>
                </div>
            </div>
        );
    };
};

export default Home;