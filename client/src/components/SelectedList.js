import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Selected from './Selected';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DarkThemeContext from '../contexts/DarkThemeContext';

function SelectedList(props) {

    const [localSelected, setLocalSelected] = useState(props.selected);
    useEffect(() => {
        setLocalSelected(props.selected);
    }, [props.update, props.selected]);

    const [targetPlan, setTargetPlan] = useState(0);
    async function savePlan() {
        // Ref: https://github.com/axios/axios#axios-api and Midterm2 Update.js
        const response = await axios({
            method: `put`,
            url: `https://cpsc2600-server-railway-production.up.railway.app/api/users/${props.user.id}`, // Must use HTTPS for railway
            data: {
                planToUpdate: targetPlan,
                newPlan: {
                    selected: localSelected,
                    selectedCodes: props.selectedCodes,
                    selectedCredits: props.selectedCredits,
                    creditLimit: props.creditLimit,
                    timeslots: props.timeslots
                }
            }
        });
        // Update state of user, and also alert
        props.setUser({
            id: response.data[0].id,
            email: response.data[0].email,
            plan1: response.data[0].plan1,
            plan2: response.data[0].plan2,
            plan3: response.data[0].plan3
        });
        props.setAlerts({ ...props.alerts, savePlanOK: true });

        // Also update localStorage about user information
        localStorage.setItem(`timetableUser`, JSON.stringify({
            id: response.data[0].id,
            email: response.data[0].email,
            plan1: response.data[0].plan1,
            plan2: response.data[0].plan2,
            plan3: response.data[0].plan3
        }));
    }

    const selectedCourses = localSelected.map(course => {
        const courseData = props.coursesData.filter(data => course === data._id);
        return <Selected
            id={courseData[0]._id}
            key={courseData[0]._id}
            subject={courseData[0].Subj}
            crse={courseData[0].Crse}
            section={courseData[0].Sec}
            title={courseData[0].Title}
            crn={courseData[0].CRN}
            credit={courseData[0].Cred}
            instructors={courseData[0].Details[0].Instructor}
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
            alerts={props.alerts}
            setAlerts={props.setAlerts}
        />
    });

    // Define table styling based on theme
    const isDarkContext = useContext(DarkThemeContext);
    const tableStyle = isDarkContext ? `table-dark` : `table-light`;

    return (
        <>
            {(selectedCourses.length === 0) ?
            (<h4>No courses selected yet ...</h4>) :
            (<>
            <h4>Your courses:</h4>
            <Table bordered hover size="sm" className={`text-center ${tableStyle}`} style={{fontSize:"0.85rem"}}>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>CRN</th>
                        <th>Credits</th>
                        <th>Instructors</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {selectedCourses}
                </tbody>
            </Table>
            {(JSON.stringify(props.user) === `{}`) ?
            (<p>Log in to save your plan!</p>) :
            (<Container fluid>
                <Row>
                    <Col className="col-3">
                        <Form.Select
                            size="sm"
                            id="save-to-plan"
                            name="save-to-plan"
                            onChange={(e) => setTargetPlan(e.target.value)}
                        >
                            <option value="0">Save to ...</option>
                            <option value="plan1">Plan 1</option>
                            <option value="plan2">Plan 2</option>
                            <option value="plan3">Plan 3</option>
                        </Form.Select>
                    </Col>
                    <Col className="col-5">
                        <Button
                            variant={+targetPlan === 0 ? `danger` : `primary`}
                            className="btn-sm"
                            onClick={savePlan}
                            disabled={+targetPlan === 0}
                        >
                            {+targetPlan === 0 ? `Select a slot to save the plan` : `Save!`}
                        </Button>
                    </Col>
                </Row>
            </Container>)}
            </>)}
        </>
    )
}

export default SelectedList;