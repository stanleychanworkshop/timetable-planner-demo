import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import DarkThemeContext from '../contexts/DarkThemeContext';

function CourseFilter(props) {

    // Define classlist for theme
    const isDarkContext = useContext(DarkThemeContext);
    const classList = isDarkContext ? `on-top z-2 dark` : `on-top z-2 light`;

    return (
        <Form className={`${classList}`}>
            <Form.Group className="p-3" controlId="courseFilterInput">
                <Form.Label>Course code filter</Form.Label>
                <Form.Control
                    type="search"
                    placeholder="Enter complete or partial course code to filter course(s) ..."
                    value={props.search}
                    onChange={(e) => props.setSearch(e.target.value)}
                />
                <Form.Text className={isDarkContext ? `dark` : `light`}>Do not give any space e.g. CPSC2600</Form.Text>
            </Form.Group>
        </Form>
    )
}

export default CourseFilter;