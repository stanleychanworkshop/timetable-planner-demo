import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { TfiNewWindow } from 'react-icons/tfi';
import { useContext } from 'react';
import DarkThemeContext from '../contexts/DarkThemeContext';

function Course(props) {

    // Array to see whether each timeslot of each day is occupied
    const schedule = [
        [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
        [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
        [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
        [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
        [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
        [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``]
    ];

    // Function to update the occupation of a day's timeslots
    function updateDaySchedule(time, room, dayIndex) {
        if (time.match(/[0-9]/)) {
            const startHourIndex = parseInt(time.substring(0, 2)) - 8;
            const endHourIndex = parseInt(time.substring(5, 7)) - 8;
            for (let i = startHourIndex; i < endHourIndex; i++) {
                schedule[dayIndex][i] = `${props.code} ${props.section} ${room}`;
            }
        }
    }

    // Function to update the timeslot occupation of all days
    function updateSchedule(time, days, room) {
        if (typeof days !== 'undefined' && days.match(/[A-Z]/)) {
            for (let i = 0; i < days.length; i++) {
                if (days[i].match(/[A-Z]/)) {
                    updateDaySchedule(time, room, i);
                }
            }
        }
    }

    // Check each course component to update all days' schedules of this course
    // Also create dayAndTime strings
    props.details.forEach(detail => {
        updateSchedule(detail.time, detail.days, detail.room);
    })

    // Create JSX elements for day and time information
    const dayAndTime = props.details.map(detail => (
        <Row key={detail.id}>
            <Col className="p-0 g-0 col-sm-4">{detail.type}</Col>
            <Col className="p-0 g-0 col-sm-4">{detail.days}</Col>
            <Col className="p-0 g-0 col-sm-4">{detail.time}</Col>
        </Row>
    ));

    const dayAndTimeDetails = props.details.map(detail => (
        <tr key={detail.id}>
            <td>{detail.type}</td>
            <td>{detail.days}</td>
            <td>{detail.time}</td>
            <td>{detail.room}</td>
        </tr>
    ));

    // Function to check whether a timeslot has been occupied
    function isOccupied(slotContent) {
        return slotContent.length !== 0;
    }

    // Function to check whether course of same course code has been selected
    function isDuplicated(code) {
        return props.selectedCodes.some(selectedCode => selectedCode === code);
    }

    // Function to check whether selecting too many credits of courses
    function isExceedingCredits() {
        return props.selectedCredits + +props.credit > +props.creditLimit;
    }

    // Function to update timetable of Home page
    function updateTimetable() {
        
        // Check course code duplication even before checking time clash
        if (isDuplicated(props.code)) {
            props.setAlerts({ ...props.alerts, duplicatedCode: true });
            return;
        }

        const newTimeslots = props.timeslots;
        /* Check whether there is any time clash; if no, assign to timetable slots
        Important: There is an issue that, if using just one loop to handle this process
        i.e. using the loop commented out, some slots in the timetable UI would still be filled with a course,
        in spite of the failure to really select the course.
        To demonstrate this bug, try to add both ATSR1102-001 and APPL5295-M01 */
        for (let day = 0; day < newTimeslots.length; day++) {
            for (let slot = 0; slot < newTimeslots[day].length; slot++) {
                if (schedule[day][slot].length !== 0) {
                    if (isOccupied(newTimeslots[day][slot])) {
                        props.setAlerts({ ...props.alerts, timeClash: true });
                        return;
                    }
                }
            }
        }
        for (let day = 0; day < newTimeslots.length; day++) {
            for (let slot = 0; slot < newTimeslots[day].length; slot++) {
                if (schedule[day][slot].length !== 0) {
                    newTimeslots[day][slot] = schedule[day][slot];
                }
            }
        }
        // for (let day = 0; day < newTimeslots.length; day++) {
        //     for (let slot = 0; slot < newTimeslots[day].length; slot++) {
        //         if (schedule[day][slot].length !== 0) {
        //             if (isOccupied(newTimeslots[day][slot])) {
        //                 props.setAlerts({ ...props.alerts, timeClash: true });
        //                 return;
        //             }
        //             newTimeslots[day][slot] = schedule[day][slot];
        //         }
        //     }
        // }

        // Update state for timetable display
        props.setTimeslots(newTimeslots);

        // Update selected course id
        const newSelected = props.selected;
        newSelected.push(props.id);
        props.setSelected(newSelected);

        // Update selected course codes
        const newSelectedCodes = props.selectedCodes;
        newSelectedCodes.push(props.code);
        props.setSelectedCodes(newSelectedCodes);

        // Show alert about course selected, depending on whether exceeding credit limit or not
        if (isExceedingCredits()) {
            props.setAlerts({ ...props.alerts, overCredit: true });
        } else {
            props.setAlerts({ ...props.alerts, selectCourseOK: true });
        }

        // Update selected credits
        props.setSelectedCredits(props.selectedCredits + +props.credit);
        
        // Need to also update a simple "update" state for re-rendering
        props.setUpdate(props.update + 1);
    }

    // Define classlist for theme
    const isDarkContext = useContext(DarkThemeContext);
    const classList = isDarkContext ? `dark` : `light`;

    return (
        <Accordion className={`z-0 ${classList}`}>
            <Accordion.Item eventKey={props.id} className={`${classList}`}>
                <Accordion.Header className={`${classList}`}>
                    <Container fluid style={{fontSize:"0.9rem"}}>
                        <Row>
                            <Col className="col-2">{`${props.code}-${props.section}`}</Col>
                            <Col className="col-3">{props.title}</Col>
                            <Col className="col-4 course-day-time">
                                <Container>{dayAndTime}</Container>
                            </Col>
                            <Col>{props.details[0].instructor}</Col>
                        </Row>
                    </Container>
                </Accordion.Header>
                <Accordion.Body className={`${classList}`}>
                    <Container fluid style={{fontSize:"0.85rem"}}>
                        <Row>
                            <Col className="col-10">
                                <Table>
                                    <tr>
                                        <th>Type</th>
                                        <th>Days</th>
                                        <th>Time</th>
                                        <th>Location</th>
                                    </tr>
                                    {dayAndTimeDetails}
                                </Table>
                                Credit: {props.credit}
                                <br />
                                CRN: {props.crn}
                                <br />
                                Additional fees: {props.additionalFees}
                                <br />
                                Repeat limit: {props.repeatLimit}
                                <br />
                                <a
                                    href={`https://langara.ca/programs-and-courses/courses/${props.subject}/${props.crse}.html`}
                                    target="_blank"
                                    rel="noreferrer"
                                >More information about this course</a> <TfiNewWindow />
                            </Col>
                            <Col className="col-2">
                                <Button onClick={updateTimetable} className="btn-sm">Select</Button>
                            </Col>
                        </Row>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )

}

export default Course;
