import React, { useState, useEffect } from 'react';

const EditUserForm = props => {
    const [user, setUser] = useState(props.currentUser);

    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    };

    const submitForm = event => {
        event.preventDefault();

        props.updateUser(user.id, user);
    };

    useEffect(() => {
        setUser(props.currentUser);
    }, [props]);

    return (
        <div className="row">
            <form className="col s12"
                onSubmit={submitForm}>

                <div class="mb-3 col-12">
					<label class="form-label" htmlFor="name">Name</label>
					<input 
						type="text" 
						name="name" 
						class="form-control"
						value={user.name}
						onChange={handleInputChange} 
						required />
                </div>

                <div class="mb-3 col-12">
					<label class="form-label" htmlFor="surname">Surame</label>
					<input 
						type="text" 
						name="surname" 
						class="form-control"
						value={user.surname}
						onChange={handleInputChange} 
						required />
                </div>

				<div class="mb-3 col-12">
					<label class="form-label" htmlFor="username">Username please do not change</label> {/* the id of the USERNAME?*/}
					<input type="text" 
						class="form-control"
						id={user.id}
						name="username"
						value={user.username}
						onChange={handleInputChange} 
						required />
                </div>

                <div class="mb-3 col-12">
					<label class="form-label" htmlFor="password">Password</label>
					<input 
						type="text" 
						name="password" 
						class="form-control"
						value={user.password}
						onChange={handleInputChange} 
						required />
                </div>

                <div class="mb-3 col-12">
					<label class="form-label" htmlFor="description">Description</label>
					<input 
						type="text" 
						name="description" 
						class="form-control"
						value={user.description}
						onChange={handleInputChange} 
						required />
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-primary mb-3">Update Profile</button>
                    </div>
                    <div className="col-6">
                        <button 
                            className="btn btn-primary mb-3"
                            onClick={() => props.setEditing(false)}
                            >Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;

