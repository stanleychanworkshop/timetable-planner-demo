import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import CourseSelection from '../components/CourseSelection';
import Timetable from '../components/Timetable';
import CreditControl from '../components/CreditControl';
import SelectedList from '../components/SelectedList';
import Spinner from 'react-bootstrap/Spinner';
import { useContext } from 'react';
import DarkThemeContext from '../contexts/DarkThemeContext';

function Home(props) {  
    
    // Define classlist for theme
    const isDarkContext = useContext(DarkThemeContext);
    const classList = isDarkContext ? `dark` : `light`;
    
    return (
        <Container fluid className={`${classList}`} style={{minHeight:`100vh`}}>
            <Row>
                <Col className="col-6 d-flex justify-content-evenly">
                    {(props.fetching) ?
                    (<>
                    <h4>Loading, please wait ... :)</h4>
                    <br /><br />
                    <Spinner animation="border">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    </>) :
                    (<CourseSelection
                        coursesData={props.coursesData}
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
                        user={props.user}
                    />)}
                </Col>
                <Col className={`col-6 on-top ${classList}`}>
                    <Stack style={{fontSize:"0.85rem"}}>
                        <Timetable
                            timeslots={props.timeslots}
                            update={props.update}
                            setUpdate={props.setUpdate}                       
                        />
                        <CreditControl
                            creditLimit={props.creditLimit}
                            setCreditLimit={props.setCreditLimit}
                            selectedCredits={props.selectedCredits}
                        />
                        <SelectedList
                            coursesData={props.coursesData}
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
                            user={props.user}
                            setUser={props.setUser}
                            alerts={props.alerts}
                            setAlerts={props.setAlerts}
                        />
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;