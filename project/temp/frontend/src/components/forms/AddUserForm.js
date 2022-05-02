import React, { useState } from 'react';

const AddUserForm = props => {

    const initialFormState = { name: '', surname: '', description: '', username: '', password: ''};
    const [user, setUser] = useState(initialFormState);

    const handleInputChange = event => {
        const {name, value} = event.target;

        setUser({ ...user, [name]: value });
    }

    const submitForm = event => {
        event.preventDefault();

        if (!user.username || !user.password) return; // think that does not create new profile if same

        props.addUser(user);
        setUser(initialFormState);
    };

    return (
        <div className="row">
            <form className="col s12"
                onSubmit={submitForm}>

				<div class="mb-3 col-12">  {/*name*/}
					<label class="form-label" htmlFor="name">Name</label>
					<input type="text" 
						class="form-control"
						name="name" 
						value={user.name}
						onChange={handleInputChange} 
						required />
                </div>

				<div class="mb-3 col-12">  {/*surname*/}
					<label class="form-label" htmlFor="surname">Surname</label>
					<input type="text" 
						class="form-control"
						id="surname" 
						name="surname" 
						value={user.surname}
						onChange={handleInputChange} 
						required />
                </div>

				<div class="mb-3 col-12">  {/*username*/}
					<label class="form-label" htmlFor="username">Username</label>
					<input type="text" 
						class="form-control"
						id="username" 
						name="username" 
						value={user.username}
						onChange={handleInputChange} 
						required />
                </div>

				<div class="mb-3 col-12">  {/*password*/}
					<label class="form-label" htmlFor="password">Password</label>
					<input type="text" 
						class="form-control"
						id="password" 
						name="password" 
						value={user.password}
						onChange={handleInputChange} 
						required />
                </div>

				<div class="mb-3 col-12">  {/*description*/}
					<label class="form-label" htmlFor="description">Description</label>
					<input type="text" 
						class="form-control"
						id="description" 
						name="description" 
						value={user.description}
						onChange={handleInputChange} 
						required />
                </div>
                
				<div class="col-12">
					<button className="btn btn-primary mb-3">Create Profile</button>
				</div>

            </form>
        </div>
    );
};

export default AddUserForm;