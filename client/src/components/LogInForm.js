import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from 'axios';

function LogInForm(props) {
  
    // States about user input and error message
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [errorMsg, setErrorMsg] = useState(``);

    /* Function to handle log in form submission;
    need to use POST request to avoid leak of sensitive data */
    async function handleSubmit(e) {
        e.preventDefault();

        // Ref: https://github.com/axios/axios#axios-api and Midterm2 Update.js
        const response = await axios({
            method: `post`,
            url: `https://cpsc2600-server-railway-production.up.railway.app/api/users/${email}`, // Must use HTTPS for railway
            data: {
                password: password
            }
        });
        
        // Allow login if response data is not an empty string
        if (response.data.length !== 0) {
            setErrorMsg(``);
            props.setLogInForm(false);
            setEmail(``);
            setPassword(``);
            props.setUser({
                id: response.data[0].id,
                email: response.data[0].email,
                plan1: response.data[0].plan1,
                plan2: response.data[0].plan2,
                plan3: response.data[0].plan3
            });

            /* Set localStorage for current user
            Need to store the copy of user data instead of props.user,
            because seemingly props.user cannot be updated quickly enough */
            localStorage.setItem(`timetableUser`, JSON.stringify({
                id: response.data[0].id,
                email: response.data[0].email,
                plan1: response.data[0].plan1,
                plan2: response.data[0].plan2,
                plan3: response.data[0].plan3
            }));

            // Update alerts
            props.setAlerts({ ...props.alerts, loginOK: true, logoutOK: false });

        } else {
            setErrorMsg(`Wrong email/password. Create an account if you have not done so!`);
        }
    }

    // Function to hide the log in form
    function handleHide() {
        props.setLogInForm(false);
        setEmail(``);
        setPassword(``);
        setErrorMsg(``);
    }

    return (
        <Modal
            show={props.logInForm}
            onHide={handleHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="logInEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="logInPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log in!
                    </Button>
                    <p className="text-danger">{errorMsg}</p>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default LogInForm;