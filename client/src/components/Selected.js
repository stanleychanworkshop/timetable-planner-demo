import Button from 'react-bootstrap/Button';

function Selected(props) {

    // Function to remove the course from selection
    function removeCourse() {
        // Update state for timetable display
        const newTimeslots = props.timeslots;
        for (let day = 0; day < newTimeslots.length; day++) {
            for (let slot = 0; slot < newTimeslots[day].length; slot++) {
                if (newTimeslots[day][slot].includes(`${props.subject}${props.crse}`)) {
                    newTimeslots[day][slot] = ``;
                }
            }
        }
        props.setTimeslots(newTimeslots);

        // Update selected course id
        const newSelected = props.selected.filter(id => id !== props.id);
        props.setSelected(newSelected);

        // Update selected credits
        props.setSelectedCredits(+props.selectedCredits - +props.credit);

        // Update selected course codes
        const newSelectedCodes = props.selectedCodes.filter(code => code !== `${props.subject}${props.crse}`);
        props.setSelectedCodes(newSelectedCodes);

        // Need to also update a simple "update" state for re-rendering of timetable
        props.setUpdate(props.update + 1);

        // Update alerts
        props.setAlerts({ ...props.alerts, removeCourseOK: true });

    }

    return (
        <tr>
            <td>{`${props.subject}${props.crse}-${props.section}`}</td>
            <td>{`${props.title}`}</td>
            <td>{`${props.crn}`}</td>
            <td>{`${props.credit}`}</td>
            <td>{`${props.instructors}`}</td>
            <td><Button onClick={removeCourse} className="btn-sm">Remove</Button></td>
        </tr>
    );
}

export default Selected;