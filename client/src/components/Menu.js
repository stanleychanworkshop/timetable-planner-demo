import Navigation from './Navigation';
import AccountControl from './AccountControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ThemeSwitch from './ThemeSwitch';

function Menu(props) {

    return (
        // A single-row container to contain different elements / components
        <Container fluid className={`position-sticky top-0 z-2`}>
            <Row className="align-items-center bg-info d-flex justify-content-between">
                
                {/* 1. Dark / Light theme toggle */}
                <Col className="col-1"><ThemeSwitch isDarkTheme={props.isDarkTheme} setDarkTheme={props.setDarkTheme} /></Col>

                {/* 2. Title and screen advice of this app */}
                <Col className="col-5 text-start">
                    <span>Langara Timetable Planner (Spring 2024): Best with screen width {`>=1366px`}</span>
                </Col>
                
                {/* 3. Navigation bar: Home / Docs / Sources */}
                <Col className="col-3 text-start"><Navigation /></Col>

                {/* 4. Account control dropdown menu */}
                <Col className="col-1 text-start">
                    <AccountControl
                        user={props.user}
                        setUser={props.setUser}
                        timeslots={props.timeslots}
                        setTimeslots={props.setTimeslots}
                        update={props.update}
                        setUpdate={props.setUpdate}
                        selected={props.selected}
                        setSelected={props.setSelected}
                        selectedCodes={props.selectedCodes}
                        setSelectedCodes={props.setSelectedCodes}
                        selectedCredits={props.selectedCredits}
                        setSelectedCredits={props.setSelectedCredits}
                        creditLimit={props.creditLimit}
                        setCreditLimit={props.setCreditLimit}
                        alerts={props.alerts}
                        setAlerts={props.setAlerts}
                    />
                </Col>
                
                {/* 5. Link to information of the app's developer */}
                <Col className="col-2 text-end">
                    <span>By <a href="https://www.linkedin.com/in/stanleychankaki/" target="_blank" rel="noreferrer">Stanley Chan</a></span>
                </Col>
            </Row>
        </Container>
    )
}

export default Menu;