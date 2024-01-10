import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import { TiTickOutline, TiTimesOutline } from "react-icons/ti";
import axios from 'axios';

function CreateAccountForm(props) {

    // States of different inputs
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [confirmPassword, setConfirmPassword] = useState(``);

    // States for four requirements of password, and the related HTML element indicating fulfillment
    const [withLowerLetter, setWithLowerLetter] = useState(false);
    const lowerLetterMsg = (
        <p className={withLowerLetter ? `text-success mb-0` : `text-danger mb-0`}>
            Contains at least one lowercase letter {passwordTest(withLowerLetter)}
        </p>
    );
    const [withUpperLetter, setWithUpperLetter] = useState(false);
    const upperLetterMsg = (
        <p className={withUpperLetter ? `text-success mb-0` : `text-danger mb-0`}>
            Contains at least one uppercase letter {passwordTest(withUpperLetter)}
        </p>
    );
    const [withNumber, setWithNumber] = useState(false);
    const numberMsg = (
        <p className={withNumber ? `text-success mb-0` : `text-danger mb-0`}>
            Contains at least one number {passwordTest(withNumber)}
        </p>
    );
    const [isLongEnough, setIsLongEnough] = useState(false);
    const MIN_LENGTH = 8;
    const lengthMsg = (
        <p className={isLongEnough ? `text-success mb-0` : `text-danger mb-0`}>
            Contains at least eight characters {passwordTest(isLongEnough)}
        </p>
    );

    // State for checking passwords matched or not, and the related HTML element
    const [passwordsMatched, setPasswordsMatched] = useState(false);
    // Only show this element when user has entered something in either password field
    const matchingMsg = (confirmPassword.length > 0 || password.length > 0 ? (
        <p className={passwordsMatched ? `text-success mb-0` : `text-danger mb-0`}>
            Passwords matched {passwordTest(passwordsMatched)}
        </p>
        ) : ``
    );

    // Function for controlling icon showing whether a password requirement is fulfilled
    function passwordTest(requirement) {
        return requirement ? <TiTickOutline /> : <TiTimesOutline />;
    }

    // useEffect() hook to check whether the password fulfills all four requirements
    useEffect(() => {
        setWithLowerLetter(/[a-z]/.test(password));
        setWithUpperLetter(/[A-Z]/.test(password));
        setWithNumber(/[0-9]/.test(password));
        setIsLongEnough(password.length >= MIN_LENGTH);
    }, [password]);

    // useEffect() hook to check two passwords matched or not
    useEffect(() => {
        setPasswordsMatched(password === confirmPassword);
    }, [password, confirmPassword]);

    // State of form submission readiness, and useEffect() hook to update this state
    const [formReady, setFormReady] = useState(false);
    useEffect(() => {
        setFormReady(email && withLowerLetter && withUpperLetter && withNumber && isLongEnough && passwordsMatched);
    }, [email, withLowerLetter, withUpperLetter, withNumber, isLongEnough, passwordsMatched]);

    // State for email error msg (When using email used before to create an account)
    const [emailErrorMsg, setEmailErrorMsg] = useState(``);

    /* Function to handle log in form submission for account creation;
    need to use POST request to avoid leak of sensitive data */
    async function handleSubmit(e) {
        e.preventDefault();

        // try-catch block to handle error 400 sent from server (https://stackoverflow.com/a/70721332)
        try {
            // Ref: https://github.com/axios/axios#axios-api and Midterm2 Update.js
            await axios({
                method: `post`,
                url: `http://localhost:3500/api/users/`, // Must use HTTPS for railway
                data: {
                    email: email,
                    password: password
                }
            });
            // Make sure no message about duplicated email
            setEmailErrorMsg(``);

            // Hide the form
            handleHide();
            
            // Update alerts
            props.setAlerts({ ...props.alerts, createAccountOK: true });

        } catch (error) {
            // Catch error of status 400
            setEmailErrorMsg(error.response.data.message);
        }
    }

    // Function to handle hiding the form
    function handleHide() {
        props.setCreateAccountForm(false);
        setEmail(``);
        setPassword(``);
        setConfirmPassword(``);
    }

    return (
        <Modal
            show={props.createAccountForm}
            onHide={handleHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mt-3" controlId="accountEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="accountPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    {lowerLetterMsg}
                    {upperLetterMsg}
                    {numberMsg}
                    {lengthMsg}

                    <Form.Group className="mt-3" controlId="confirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    {matchingMsg}

                    {/* Conditionally rendering the enabled / disabled button depending on whether the form is ready or not */}
                    <Button 
                        variant={formReady ? `primary` : `danger`}
                        type="submit"
                        disabled={!formReady}
                        className="mt-3"
                    >
                        {formReady ? `Create account!` : `Complete form first ...`}
                    </Button>
                    <p className="text-danger">{emailErrorMsg}</p>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateAccountForm;