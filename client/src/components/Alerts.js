import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';

function Alerts(props) {

    // Function to close an alert
    function closeAlert(alertKey) {
        props.setAlerts({ ...props.alerts, [alertKey]: false });
    }
    
    /* An array of alert info objects;
    each object representing the three pieces of info required to render each type of alert */
    const alertsInfo = [
        {
            key: `loginOK`,
            variant: `success`,
            message: `Welcome back, ${props.user.email}`
        },
        {
            key: `logoutOK`,
            variant: `info`,
            message: `Successfully logged out. Goodbye!`
        },
        {
            key: `createAccountOK`,
            variant: `success`,
            message: `Congratulations! Account created, please proceed to log in.`
        },
        {
            key: `selectCourseOK`,
            variant: `success`,
            message: `Course selected, you should see it on the right!`
        },
        {
            key: `removeCourseOK`,
            variant: `success`,
            message: `Course removed!`
        },
        {
            key: `timeClash`,
            variant: `danger`,
            message: `Unable to select course. Reason: Time clash with another course!`
        },
        {
            key: `duplicatedCode`,
            variant: `danger`,
            message: `Unable to select course. Reason: Course with the same code already selected!`
        },
        {
            key: `overCredit`,
            variant: `warning`,
            message: `Warning - Course selected, but you have exceeded your credit limit!`
        },
        {
            key: `savePlanOK`,
            variant: `success`,
            message: `Plan saved. You can retrieve it by clicking on "Account" at the top!`
        },
        {
            key: `loadPlanOK`,
            variant: `success`,
            message: `Plan loaded!`
        },
    ];

    // Use alerts information to create an array of <Alert /> components i.e. a stack of alerts
    const alertsStack = alertsInfo.map(info => {
        return (
        <Alert
            key={info.key}
            id={info.key}
            variant={info.variant}
            show={props.alerts[`${info.key}`]} // Only show the alert when the related alert state is true (see <App />)
            onClose={() => closeAlert(`${info.key}`)}
            dismissible
            className="m-0 p-3"
            style={{fontSize:"0.9rem"}}
        >
            <Alert.Heading as="p" className="m-0">{info.message}</Alert.Heading>
        </Alert>
        );
    })

    return (
        <Stack className="alerts z-3">
            {alertsStack}
        </Stack>
    );
    
}

export default Alerts;