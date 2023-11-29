import Form from 'react-bootstrap/Form';
import { MdDarkMode } from 'react-icons/md';
import { MdLightMode } from "react-icons/md";

function ThemeSwitch(props) {

    /* Define CSS class based on props.isDarkTheme
    Ref: https://developers.google.com/fonts/docs/material_icons#styling_icons_in_material_design */
    const classList = props.isDarkTheme ? `material-icons md-48 md-dark` : `material-icons md-48 md-light`;

    // Function to toggle dark / light theme and update localStorage
    function toggleTheme() {
        const oldTheme = props.isDarkTheme;
        props.setDarkTheme(!oldTheme);
        localStorage.setItem(`isDarkTheme`, JSON.stringify(!oldTheme));
    }

    return (
        <>
            {/* Conditionally render the switch depending on theme and related CSS class */}
            <MdLightMode className={`${classList}`} style={{display:`inline-block`}} />
            <Form.Switch
                inline
                className="m-0 ps-5"
                checked={props.isDarkTheme}
                onChange={toggleTheme}
            />
            <MdDarkMode className={`${classList}`} style={{display:`inline-block`}} />
        </>
    )
}

export default ThemeSwitch;