import { useContext } from 'react';
import DarkThemeContext from '../contexts/DarkThemeContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Docs() {

    // Define classlist for theme
    const isDarkContext = useContext(DarkThemeContext);
    const classList = isDarkContext ? `dark` : `light`;

    // Key documentation content
    const documentation = (
        <Col className="px-3">
            <h1>Documentation</h1>
            <p>This Timetable Planner Demo is a web application to help students plan their course timetable before course registration, with the features of instantly viewing the timetable when selecting a course, saving a particular course plan and load it, etc. It uses course information of Langara College, Vancouver BC, Canada (Spring 2024 semester) for demonstration purpose.</p>
            <p>The web application is developed with the MERN stack, with the help of React Bootstrap to create the front-end components. It should be noted that the database stores users' information (see more about user account below), while the static course information (and could be outdated) is provided by the courtesy of Ms. Samantha Liu.</p>
            <p>Please note that this web application is not mobile-friendly - the two-column layout is essential for instantly viewing the timetable plan updated by selecting / removing a course. It is best used with a viewport of at least 1366px.</p>
            
            <div></div>
            <h2 id="docs-how-to-use">How to use?</h2><br></br>

            <h4 id="docs-course-info">Course information</h4>
            <p>Intuitively, the first thing to do would be to scroll through the list of available courses on the left-hand side of the "Home" page. Each course is an Accordion component. Before clicking it, minimal course information is shown:</p>
            <ul>
                <li>Course code and section number e.g. ABST1104-W01</li>
                <li>Course title e.g. Canadian Aboriginal Policy (Note: Short-form may be used for some courses)</li>
                <li>Course component e.g. Lecture / Lab / WWW</li>
                <li>Course day e.g. -M----- means the course component is scheduled on Monday</li>
                <li>Course time e.g. 1030-1320</li>
                <li>Name(s) of instructor(s)</li>
            </ul>
            <p>When clicking on each Accordion component, more information of the course can be shown by a "dropdown". Additionally, a "Select" button is available to try to add the course to the timetable. If the course can be successfully selected, the result could be seen on the right-hand side of the page (more about this discussed below).</p>
            <p>In following two cases, course selection cannot be done:</p>
            <ul>
                <li>Selecting a course with the course code same as any of the courses already selected</li>
                <li>Selecting a course with time clash with any of the courses already selected</li>
            </ul>
            <p>In either case, an alert would be given on the top-left area to tell the user why a course cannot be added.</p>
            <br></br>

            <h4 id="docs-course-code-filter">Course code filter</h4>
            <p>At the top of the left-hand side, an input field allows the user to type a course code to view the desired course(s) only. The input can be complete (e.g. CPSC2600) or partial (e.g. CPS), and is case-insensitive.</p>
            <br></br>

            <h4 id="docs-timetable">Timetable</h4>
            <p>A timetable from Monday to Saturday, 08:30 to 21:20, is avaiable on the right to allow users to view the timetable when some courses are selected. When the user successfully selects a course as mentioned above, the related timeslots in the timetable would be immediately filled with course code, section number, and location of all course components.</p>
            <p>Should the course component is a scheduled but online one, it shows "WWW" as the location - allowing the user to observe the possibility of having all-online classes on any day of the week from the timetable.</p>
            <p>It should be noted that if a component is online and asynchronous, it is not shown in the timetable because it is not a scheduled component.</p>
            <br></br>
            
            <h4 id="docs-credit-limit">Credit limit</h4>
            <p>In the middle of the right, just below the timetable, an input field allows the user to enter the maximum number of credits that should be taken in the semester. (Default: 15)</p>
            <p>It helps remind user the possibility of exceeding the credit limit when selecting courses - when the user selects a course that result in such situation, an alert is given on the top-left area as a reminder. However, to allow flexibility, the course selection would still be successful.</p>
            <br></br>

            <h4 id="docs-list-of-selected-courses">List of selected courses</h4>
            <p>A list of selected courses is displayed at the lower part on the right. Each row of course has a "Remove" button to allow the user to remove the selected course. The timetable above would immediately be updated when a course is removed.</p>
            <br></br>

            <h4 id="docs-user-account">User account</h4>
            <p>While the above functions can be used without an account, only user who has logged in can save the planned timetable(s). The user can click the "Account" dropdown menu to choose "Log in" or "Create account". A corresponding Modal component will then appear.</p>
            <p>To log in, the user needs to enter the email address and password. Client-side validation is implemented to ensure that the email address is provided; otherwise, server error (500) will be generated and the app will crash. On the server side, some validations are implemented to check the login credentials; error status 400 is sent back to client for error message generation by React when the login information is not correct.</p>
            <p>To create an account, the user needs to provide an email address and create a password. Client-side validation is implemented to make sure that the password is at least eight-character long and consists of uppercase letter, lowercase letter, and number. All the password requirements are clearly displayed in the form to let user know how to create a valid password; also, the button to submit account creation information is disabled when this validation cannot be passed. A simple server-side validation is also implemented to check whether the email address provided has already been used; if yes, error status 400 is sent back to client for the React code to generate the error message.</p>
            <br></br>

            <h4 id="account-holder-privilege">Account-holder privilege: Saving and loading timetable</h4>
            <p>The most important reason to use this app with a user account is to save a planned timetable. When course(s) are selected, a select menu is shown under the selected course list at the bottom of the right. When the user selects a plan slot (Plan 1 / 2 / 3) and clicks "Save!", the timetable with selected course(s) can be stored in the user's account.</p>
            <p>To retrieve a saved plan, the user (who has logged in, of course) can open the "Account" dropdown menu on the top and click Plan 1 / 2 / 3. After that, the corresponding saved plan is loaded and the timetable, credit limit, and selected course list are immediately updated.</p>
            <br></br>

            <h2 id="docs-other-notable-features">Other notable features</h2><br></br>

            <h4 id="docs-dark-light-theme">Dark / Light theme</h4>
            <p>A dark / light theme toggle is placed at the very top-left corner of the app to allow user to switch between two themes. In the implementation, the theme choice is a global state created by using the React Context API, and stored in a changeable state at the top "App" component, which also includes a provider of this context. The context is used in various components of the app to control the appearance according to the theme choice.</p>
            <p>Because of the use of React Bootstrap, it is necessary to use custom CSS classes, which are available in custom.css, to override the default CSS styles in that package.</p>
            <br></br>

            <h4 id="docs-api-server">API server</h4>
            <p>A server is implemented by using ExpressJS. It provides two important APIs: (1) raw data of available courses and (2) user account database.</p>
            <p>The raw data of courses is stored in the file Raw.js, which is fetched every time when the react app loads. The raw data is then cleaned and processed to be used to construct the Accordion courses components.</p>
            <p>Meanwhile, the user account database is stored in MongoDB, with the help of Mongoose package. The data in database include unique IDs, email addresses, hashed passwords, saved plans of different users, etc. Some data of a user would be fetched to client in order to update different React states and render the components with correct information. It should be noted that the saved plans used by React are 2D arrays, which is not conveniently supported by the Mongoose schemas; therefore, when the 2D arrays are stored in the database, they need to be converted to strings (by using JSON.stringify()). When such strings are fetched by the client, they are converted back to 2D arrays (by using JSON.parse()).</p>
            <br></br>

            <h4 id="docs-spinner">Spinner</h4>
            <p>The raw data of courses is large and takes time to be fetched and cleaned when the app is loaded. To improve the user experience, a spinner with description is used whenever the data is being fetched from the server.</p>
            <br></br>

            <h4 id="docs-information-secucity">Information security</h4>
            <p>As the user database contains password of each account, it is important NOT to store the plaintext of those passwords. The bcrpyt package is used to store each password as hash with salts. In essense, the hashSync() function is used to hash the users' passwords, while the compareSync() function is used to validate a user's password against the hash in the database.</p>
            <br></br>

            <h4 id="docs-localStorage">localStorage</h4>
            <p>The client-side localStorage is used to provide better user experience in two ways.On the one hand, the user's preference of dark / light theme choice is stored. On the other hand, the user's login status is stored until the user has logged out. For information security, the password and the related hash of a user are never stored in localStorage.</p>
            <br></br>

            <h2 id="docs-areas-of-improvement">Areas of Improvement</h2><br></br>

            <h4 id="docs-pagination">Pagination</h4>
            <p>One notable performance issue of this app is the slow rendering of course list (left-column) when the number of courses is large. For example, when no course filter is applied, the course list contains more than 1,000 courses; changing the dark/light theme under this situation would lead to slow changes of the page appearance.</p>
            <p>One way to improve the situation is the break down the course list into several pages when it is too long. As the courses shown (with or without a filter) is actually an array of course sections, conditional rendering can be applied based on the length of this array. To advance, user can be given options of the number of course sections shown in a page so as to cater the needs of users of different machine powers.</p>
            <br></br>

            <h4 id="docs-server-side-validation">Server-side validation</h4>
            <p>When creating a user account, client-side validation is implemented to make sure that the password is secure enough (by meeting several requirements). However, there is no corresponding validation on the server side. There is also no server-side validation to check whether the user has provided a valid email address. The problem of this is that the back-end cannot prevent the contamination of the database by invalid / illegal data.</p>
            <p>Relevant conditional checks could be added perform the above validations on the server. Validation has been implemented to check whether a user attempts to create an account with an already-registered email address; the technique involved should be similar.</p>
            <br></br>

            <h4 id="docs-course-database">Course database</h4>
            <p>As mentioned above, the information of courses is fetched from Raw.js, which contains one single object with information of all courses.</p>
            <p>A better approach could be putting the information in a course database (one section as one instance), which allows easier coding on back-end for fetching necessary course data. It also helps the development of more filters e.g. day and time for the users to filter courses shown.</p>
            <br></br>

            <h4 id="docs-dynamic-course-information">Dynamic course information</h4>
            <p>As mentioned at the beginning, the course information is currently static. It does not provide the most updated information e.g. changes in time / instructor, addition of new course sections, number of seats left, etc. While the static course information is good enough for a demo app, it is surely undesirable for this app to be used in real-life.</p>
            <p>While challenging, the course information can ideally be dynamically crawled (such as using Python scripts) from the school's official timetable regularly e.g. every 15 minutes, and to be stored in the course database. However, the regular crawling and database update may be affected by the security policy of the school's website and monetary cost respectively.</p>
        </Col>
    )

    // Contents list for user to more easily jump to the desired section of the documentation
    const contents = (
        <Col className={`mx-5 col-5 on-top-docs-contents`}>
            <h2>Contents</h2>
            <a href="#docs-how-to-use">How to use?</a>
            <ul>
                <li><a href="#docs-course-info">Course information</a></li>
                <li><a href="#docs-course-code-filter">Course code filter</a></li>
                <li><a href="#docs-timetable">Timetable</a></li>
                <li><a href="#docs-credit-limit">Credit limit</a></li>
                <li><a href="#docs-list-of-selected-courses">List of selected courses</a></li>
                <li><a href="#docs-account-holder-privilege">Account-holder privilege</a></li>
            </ul>
            <a href="#docs-other-notable-features">Other notable features</a>
            <ul>
                <li><a href="#docs-dark-light-theme">Dark / Light theme</a></li>
                <li><a href="#docs-docs-api-server">API server</a></li>
                <li><a href="#docs-spinner">Spinner</a></li>
                <li><a href="#docs-information-security">Information security</a></li>
                <li><a href="#docs-localStorage">localStorage</a></li>
            </ul>
            <a href="#docs-areas-of-improvement">Areas of Improvement</a>
            <ul>
                <li><a href="#docs-pagination">Pagination</a></li>
                <li><a href="#docs-server-side-validation">Server-side validation</a></li>
                <li><a href="#docs-course-database">Course database</a></li>
                <li><a href="#docs-dynamic-course-information">Dynamic course information</a></li>
            </ul>
            <a href="#docs-top">Back to top</a>
        </Col>
    )

    return (
        <Container className={`${classList}`} style={{minHeight:`100vh`, minWidth:`100%`, fontSize:`0.9rem`}}>
            <div id="docs-top"></div>
            <Row className="p-5">
                {documentation}
                {contents}
            </Row>
        </Container>

    )
}

export default Docs;