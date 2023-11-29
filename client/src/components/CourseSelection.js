import Stack from 'react-bootstrap/Stack';
import CourseFilter from './CourseFilter';
import CourseList from './CourseList';
import Alerts from '../components/Alerts';
import React, { useState, useEffect } from 'react';

function CourseSelection(props) {
    
    // State of search key given by user (for <CourseFilter />)
    const [search, setSearch] = useState(``);

    // State of courses to be shown (default: all courses); updated whenever search key updates
    const [coursesToShow, setCoursesToShow] = useState(props.coursesData);
    useEffect(() => {
        if (search) {
            setCoursesToShow(props.coursesData.filter(course => course.code.startsWith(search.toUpperCase())));
        } else {
            setCoursesToShow(props.coursesData);
        }
    }, [search, props.coursesData]);

    return (
        <Stack>
            {/* Input textfield for user to filter courses */}
            <CourseFilter
                search={search}
                setSearch={setSearch}
            />

            {/* Alert message(s) that may be shown */}
            <Alerts
                alerts={props.alerts}
                setAlerts={props.setAlerts}
                user={props.user}
            />

            {/* List of courses to be selected by user */}
            <CourseList
                coursesToShow={coursesToShow}
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
        </Stack>
    )
}

export default CourseSelection;