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

        // Check whether email is really provided (otherwise will lead to error 500)
        if (email.trim().length === 0) {
            setErrorMsg(`You must provide an email address for login.`);
            return;
        }

        // try-catch block to handle error 400 sent from server (https://stackoverflow.com/a/70721332)
        try {
            // Ref: https://github.com/axios/axios#axios-api and Midterm2 Update.js
            const response = await axios({
                method: `post`,
                url: `https://timetable-planner-demo-production.up.railway.app/api/users/${email}`, // Must use HTTPS for railway
                data: {
                    password: password
                }
            });

            setErrorMsg(``);
            props.setLogInForm(false);
            setEmail(``);
            setPassword(``);
            props.setUser({
                id: response.data.id,
                email: response.data.email,
                plan1: JSON.parse(response.data.plan1),
                plan2: JSON.parse(response.data.plan2),
                plan3: JSON.parse(response.data.plan3)
            });

            /* Set localStorage for current user
            Need to store the copy of user data instead of props.user,
            because seemingly props.user cannot be updated quickly enough */
            localStorage.setItem(`timetableUser`, JSON.stringify({
                id: response.data.id,
                email: response.data.email,
                plan1: JSON.parse(response.data.plan1),
                plan2: JSON.parse(response.data.plan2),
                plan3: JSON.parse(response.data.plan3)
            }));

            // Update alerts
            props.setAlerts({ ...props.alerts, loginOK: true, logoutOK: false });

        } catch (error) {
            // Catch error of status 400
            setErrorMsg(error.response.data.message);
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