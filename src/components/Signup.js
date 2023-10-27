import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cPassword: "" })
    let history = useHistory();
    // console.log(localStorage.getItem('token')) ////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            /// redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("logged in successfully", "success")
            history.push("/")
            console.log("login successfull and auth token is set")
        }
        else {
            props.showAlert("invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-4'>
            <h2>Create an account to use iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" name="password" minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cPassword" name="cpassword" minLength={5} required onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
