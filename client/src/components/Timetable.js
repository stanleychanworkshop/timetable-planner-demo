import Table from 'react-bootstrap/Table';
import { useState, useEffect, useContext } from 'react';
import DarkThemeContext from '../contexts/DarkThemeContext';

function Timetable(props) {

    // Define table styling based on theme
    const isDarkContext = useContext(DarkThemeContext);
    const tableStyle = isDarkContext ? `table-dark` : `table-light`;

    const [localTimetable, setLocalTimetable] = useState(props.timeslots);
    useEffect(() => {
        setLocalTimetable(props.timeslots);
    }, [props.update, props.timeslots]);

    return (
        <>
            <h2>Your planned timetable</h2>
            <Table
                bordered
                size="sm"
                className={`timetable text-center align-middle ${tableStyle}`}
                style={{fontSize:"0.85rem"}}
                responsive
            >
                <thead>
                    <tr>
                        <th className="col-1">Time</th>
                        <th className="col-1">Mon</th>
                        <th className="col-1">Tue</th>
                        <th className="col-1">Wed</th>
                        <th className="col-1">Thu</th>
                        <th className="col-1">Fri</th>
                        <th className="col-1">Sat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0830-0920</td>
                        <td>{localTimetable[0][0]}</td>
                        <td>{localTimetable[1][0]}</td>
                        <td>{localTimetable[2][0]}</td>
                        <td>{localTimetable[3][0]}</td>
                        <td>{localTimetable[4][0]}</td>
                        <td>{localTimetable[5][0]}</td>
                    </tr>
                    <tr>
                        <td>0930-1020</td>
                        <td>{localTimetable[0][1]}</td>
                        <td>{localTimetable[1][1]}</td>
                        <td>{localTimetable[2][1]}</td>
                        <td>{localTimetable[3][1]}</td>
                        <td>{localTimetable[4][1]}</td>
                        <td>{localTimetable[5][1]}</td>
                    </tr>
                    <tr>
                        <td>1030-1120</td>
                        <td>{localTimetable[0][2]}</td>
                        <td>{localTimetable[1][2]}</td>
                        <td>{localTimetable[2][2]}</td>
                        <td>{localTimetable[3][2]}</td>
                        <td>{localTimetable[4][2]}</td>
                        <td>{localTimetable[5][2]}</td>
                    </tr>
                    <tr>
                        <td>1130-1220</td>
                        <td>{localTimetable[0][3]}</td>
                        <td>{localTimetable[1][3]}</td>
                        <td>{localTimetable[2][3]}</td>
                        <td>{localTimetable[3][3]}</td>
                        <td>{localTimetable[4][3]}</td>
                        <td>{localTimetable[5][3]}</td>
                    </tr>
                    <tr>
                        <td>1230-1320</td>
                        <td>{localTimetable[0][4]}</td>
                        <td>{localTimetable[1][4]}</td>
                        <td>{localTimetable[2][4]}</td>
                        <td>{localTimetable[3][4]}</td>
                        <td>{localTimetable[4][4]}</td>
                        <td>{localTimetable[5][4]}</td>
                    </tr>
                    <tr>
                        <td>1330-1420</td>
                        <td>{localTimetable[0][5]}</td>
                        <td>{localTimetable[1][5]}</td>
                        <td>{localTimetable[2][5]}</td>
                        <td>{localTimetable[3][5]}</td>
                        <td>{localTimetable[4][5]}</td>
                        <td>{localTimetable[5][5]}</td>
                    </tr>
                    <tr>
                        <td>1430-1520</td>
                        <td>{localTimetable[0][6]}</td>
                        <td>{localTimetable[1][6]}</td>
                        <td>{localTimetable[2][6]}</td>
                        <td>{localTimetable[3][6]}</td>
                        <td>{localTimetable[4][6]}</td>
                        <td>{localTimetable[5][6]}</td>
                    </tr>
                    <tr>
                        <td>1530-1620</td>
                        <td>{localTimetable[0][7]}</td>
                        <td>{localTimetable[1][7]}</td>
                        <td>{localTimetable[2][7]}</td>
                        <td>{localTimetable[3][7]}</td>
                        <td>{localTimetable[4][7]}</td>
                        <td>{localTimetable[5][7]}</td>
                    </tr>
                    <tr>
                        <td>1630-1720</td>
                        <td>{localTimetable[0][8]}</td>
                        <td>{localTimetable[1][8]}</td>
                        <td>{localTimetable[2][8]}</td>
                        <td>{localTimetable[3][8]}</td>
                        <td>{localTimetable[4][8]}</td>
                        <td>{localTimetable[5][8]}</td>
                    </tr>
                    <tr>
                        <td>1730-1820</td>
                        <td>{localTimetable[0][9]}</td>
                        <td>{localTimetable[1][9]}</td>
                        <td>{localTimetable[2][9]}</td>
                        <td>{localTimetable[3][9]}</td>
                        <td>{localTimetable[4][9]}</td>
                        <td>{localTimetable[5][9]}</td>
                    </tr>
                    <tr>
                        <td>1830-1920</td>
                        <td>{localTimetable[0][10]}</td>
                        <td>{localTimetable[1][10]}</td>
                        <td>{localTimetable[2][10]}</td>
                        <td>{localTimetable[3][10]}</td>
                        <td>{localTimetable[4][10]}</td>
                        <td>{localTimetable[5][10]}</td>
                    </tr>
                    <tr>
                        <td>1930-2020</td>
                        <td>{localTimetable[0][11]}</td>
                        <td>{localTimetable[1][11]}</td>
                        <td>{localTimetable[2][11]}</td>
                        <td>{localTimetable[3][11]}</td>
                        <td>{localTimetable[4][11]}</td>
                        <td>{localTimetable[5][11]}</td>
                    </tr>
                    <tr>
                        <td>2030-2120</td>
                        <td>{localTimetable[0][12]}</td>
                        <td>{localTimetable[1][12]}</td>
                        <td>{localTimetable[2][12]}</td>
                        <td>{localTimetable[3][12]}</td>
                        <td>{localTimetable[4][12]}</td>
                        <td>{localTimetable[5][12]}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Timetable;