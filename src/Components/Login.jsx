import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function Login() {
    const HOST = 'http://localhost:5000';

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${HOST}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success === true) {
            navigate("/");
            localStorage.setItem('token', json.auth_Token)
            console.log('token')
        } else {
            alert('Invalid Credentials');
        }
    }


    return (
        <div>
            <Form className="mt-4" onSubmit={handleClick}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' value={credentials.email} onChange={handleChange} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' value={credentials.password} onChange={handleChange} placeholder="Password" />
                </Form.Group>
                <Button variant="warning" type="submit">
                    Submit
                </Button>
            </Form></div>
    )
}

export default Login