import Stack from 'react-bootstrap/Stack';
import Course from './Course';

function CourseList(props) {

    // Function to help simplify the course components to be an array
    function getCourseDetails(details) {
        const detailsArray = details.map((detail) => {
            return {
                type: detail.Type,
                days: detail.Days,
                time: detail.Time,
                room: detail.Room,
                instructor: detail.Instructor,
                id: detail._id,
                key: detail._id
            }
        })
        return detailsArray;
    }
    
    // Create an array of relevant <Course/> components
    const courses = props.coursesToShow.map((course) => (
        <Course
            id={course._id}
            key={course._id}
            code={course.code}
            subject={course.Subj}
            crse={course.Crse}
            section={course.Sec}
            credit={course.Cred}
            title={course.Title}
            additionalFees={course.AddFees}
            repeatLimit={course.RptLimit}
            crn={course.CRN}
            details={getCourseDetails(course.Details)}
            timetable={props.timetable}
            setTimetable={props.setTimetable}
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
    ));

    return (
        <Stack>
            {courses}
        </Stack>
    )
}

export default CourseList;