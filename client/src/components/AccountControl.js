import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState } from 'react';
import LogInForm from './LogInForm';
import CreateAccountForm from './CreateAccountForm';

function AccountControl(props) {

    // State about showing the Log-in form / Account-creation form or not
    const [logInForm, setLogInForm] = useState(false);
    const [createAccountForm, setCreateAccountForm] = useState(false);

    // Function to log out from the current account
    function handleLogout() {
        props.setUser({});
        props.setSelected([]);
        props.setSelectedCodes([]);
        props.setSelectedCredits(0);
        props.setCreditLimit(15);
        // Need a bit hard-coding here to empty the timetable when logging out
        const emptyTimeslots = [[``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``]];
        props.setTimeslots(emptyTimeslots);
        props.setUpdate(props.update + 1);

        /* Set localStorage for no user
        Need to store {} directly instead of props.user,
        because seemingly props.user cannot be updated quickly enough */
        localStorage.setItem(`timetableUser`, JSON.stringify({}));

        // Update alerts
        props.setAlerts({ ...props.alerts, loginOK: false, logoutOK: true });
    }

    // Function to load a saved plan
    function loadPlan(plan) {
        props.setSelected(props.user[plan].selected);
        props.setSelectedCodes(props.user[plan].selectedCodes);
        props.setSelectedCredits(props.user[plan].selectedCredits);
        props.setCreditLimit(props.user[plan].creditLimit);
        props.setTimeslots(props.user[plan].timeslots);
        props.setUpdate(props.update + 1);
        props.setAlerts({ ...props.alerts, loadPlanOK: true });
    }

    // Two kinds of menu depending on whether the user has logged in
    const memberMenu = (
        <NavDropdown title="Account">
            <NavDropdown.Item onClick={() => loadPlan(`plan1`)}>Plan 1</NavDropdown.Item>
            <NavDropdown.Item onClick={() => loadPlan(`plan2`)}>Plan 2</NavDropdown.Item>
            <NavDropdown.Item onClick={() => loadPlan(`plan3`)}>Plan 3</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
        </NavDropdown>
    );

    const nonMemberMenu = (
        <NavDropdown title="Account">
            <NavDropdown.Item onClick={() => setLogInForm(true)}>Log in</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setCreateAccountForm(true)}>Create account</NavDropdown.Item>
        </NavDropdown>
    )

    return (
        /* Render both forms that can only be accessed through member menu;
        conditionally rendering member / non-member menu based on login states i.e. props.user */
        <>
            <LogInForm
                logInForm={logInForm}
                setLogInForm={setLogInForm}
                setUser={props.setUser}
                user={props.user}
                alerts={props.alerts}
                setAlerts={props.setAlerts}
            />
            <CreateAccountForm
                createAccountForm={createAccountForm}
                setCreateAccountForm={setCreateAccountForm}
                alerts={props.alerts}
                setAlerts={props.setAlerts}
            />
            {JSON.stringify(props.user) === `{}` ? nonMemberMenu : memberMenu}
        </>
    )
}

export default AccountControl;