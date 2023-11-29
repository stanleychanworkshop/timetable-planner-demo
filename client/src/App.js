import { Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Sources from './pages/Sources';
import Error from './pages/Error';
import Menu from './components/Menu';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import DarkThemeContext from './contexts/DarkThemeContext';

function App() {

  /* State about using dark theme or not, default to be false (same as DarkThemeContext value)
  Still needs to be passed to <Menu /> --> <ThemeSwitch /> to allow theme update */
  const [isDarkTheme, setDarkTheme] = useState(false);

  // Check localStorage for dark theme status
  useEffect(() => {
    const userTheme = localStorage.getItem(`isDarkTheme`);
    if (userTheme) {
      setDarkTheme(JSON.parse(userTheme));
    }
  }, []);
  
  // State about user; empty object means not logged in
  const [user, setUser] = useState({});

  // Check localStorage for log-in status
  useEffect(() => {
    const userData = localStorage.getItem(`timetableUser`);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  /* The following five states are about the states about a timetable plan being shown on screen:
  1. Unique IDs of a selected courses
  2. Course code of selected courses
  3. Number of credits of selected courses
  4. Max. number of credits set by user
  5. Occupation of timeslots in a timetable 
  Theoretically, except for the max. credits set by user, other four states should be combined to the first one only,
  because states 2/3/5 could also be derived from the unique ID of each course object.
  However, because of a large number of course objects (>1000),
  it takes time to use map() method to loop through all course objects and search for the required information whenever the page re-renders.
  Therefore, multiple states are used here as a work around. */
  const [selected, setSelected] = useState([]); // State for the unique IDs of selected courses
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [selectedCredits, setSelectedCredits] = useState(0);
  const [creditLimit, setCreditLimit] = useState(15);
  const [timeslots, setTimeslots] = useState([
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``]
  ]);

  /* State about timetable updated.
  This is theoretically not needed, but is still included here for updating what is shown in the timetable.
  In theory, the re-rendering of the shown timetable should only depend on the update of the "timeslots" state above.
  However, it is suspected that the mutation of the 2D array cannot activate the useEffect() hook in <Timetable /> component,
  i.e. the timetable viewed by user is not updated when selecting / removing a course,
  although DevTool shows that the timeslots state is correct updated (i.e. array correctly mutated, filled with selected courses).
  Breaking down the 2D timeslots array to become six 1D array (each representing one day from Mon to Sat) also does not work.
  Therefore, a workaround is done here by using a simple "update" state that is of a primitive numeric type,
  which is used to trigger the re-rendering of <Timetable /> component (and, thus, the timetable viewed by user).
  This "update" state is updated whenever a course is selected / removed. */
  const [update, setUpdate] = useState(0);

  // Two states about raw course data: (1) An array of course objects, (2) State about whether the app is fetching such data
  const [coursesData, setCoursesData] = useState([]);
  const [fetching, setFetching] = useState(false);
  
  // Use useEffect() hook to fetch raw data whenever the app is loaded
  useEffect(() => {
    
    // Async function to make sure the codes after the await statement executes only after the await statement has finished its work?
    async function fetchData() {
      // Let the browser knows that the app is fetching data (so as to provide a message to user)
      setFetching(true);
      
      // Get the Promise object given by the server (deployed with Railway)
      const response = await axios.get(`https://cpsc2600-server-railway-production.up.railway.app/api/raw`); // Must use HTTPS for Netlify to send GET request

      // Extract the courses data from the Promise object, and "clean" the course code
      const processingData = response.data.data.courseSchedules.map(course => (
        {...course, code: course.code.replace(/\s/g, ``)} // Remove the space in course code e.g. CPSC 2600 -> CPSC2600
      ));

      // Sort the courses according to course code, then CRN
      processingData.sort((a, b) => {
        if (a.code < b.code) {
            return -1;
        }
        if (a.code > b.code) {
            return 1;
        }
        if (a.CRN < b.CRN) {
            return -1;
        }
        if (a.CRN > b.CRN) {
            return 1;
        }
        return 0;
      });

      // Update the array of course objects to display course list
      setCoursesData(processingData);

      // End fetching, no more user message, can display course list
      setFetching(false);
    }

    // Execute the function above
    fetchData();
  }, []);

  // State of different alerts
  const [alerts, setAlerts] = useState({
    loginOK: false,
    logoutOK: false,
    createAccountOK: false,
    selectCourseOK: false,
    removeCourseOK: false,
    timeClash: false,
    duplicatedCode: false,
    overCredit: false,
    savePlanOK: false,
    loadPlanOK: false
  });
  
  return (
    // Wrap the whole UI with theme context
    <DarkThemeContext.Provider value={isDarkTheme}>
      <Stack>
        <Menu
          isDarkTheme={isDarkTheme}
          setDarkTheme={setDarkTheme}
          user={user}
          setUser={setUser}
          timeslots={timeslots}
          setTimeslots={setTimeslots}
          update={update}
          setUpdate={setUpdate}
          selected={selected}
          setSelected={setSelected}
          selectedCodes={selectedCodes}
          setSelectedCodes={setSelectedCodes}
          selectedCredits={selectedCredits}
          setSelectedCredits={setSelectedCredits}
          creditLimit={creditLimit}
          setCreditLimit={setCreditLimit}
          alerts={alerts}
          setAlerts={setAlerts}
        />
        <Switch>
          <Route path="/" exact>
            <Home
              coursesData={coursesData}
              user={user}
              setUser={setUser}
              timeslots={timeslots}
              setTimeslots={setTimeslots}
              update={update}
              setUpdate={setUpdate}
              selected={selected}
              setSelected={setSelected}
              selectedCodes={selectedCodes}
              setSelectedCodes={setSelectedCodes}
              selectedCredits={selectedCredits}
              setSelectedCredits={setSelectedCredits}
              creditLimit={creditLimit}
              setCreditLimit={setCreditLimit}
              fetching={fetching}
              alerts={alerts}
              setAlerts={setAlerts}
            />
          </Route>
          <Route path="/docs" component={Docs} exact />
          <Route path="/sources" component={Sources} exact />
          <Route component={Error} />
        </Switch>
      </Stack>
    </DarkThemeContext.Provider>
  );
}

export default App;
